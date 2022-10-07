'use strict';

const session = require('express-session');
const express = require('express');
const cors = require('cors');               // needed for using webpack-devserver with express server
const bodyParser = require('body-parser')
const http = require('http');
const WebSocket = require('ws');

const app = express();

// needed to make all requests from client work with this server.
app.use(cors({ origin: true, credentials: true }));
app.options("*", cors({ origin: true, credentials: true }));

app.use(bodyParser.json());

// We need the same instance of the session parser in express and
// WebSocket server, to give socket-handlers access to the session.
const sessionParser = session({
  saveUninitialized: false,
  secret: '$eCuRiTy',
  resave: false
});
app.use(sessionParser);

// Here we set up the session, but only if the password is correct.
app.post('/login', (req, res) => {

  if(req.body.password !== "password") {       // not great security ;-)
    res.status(401).send("password invalid."); // reject login attempt
    return;
  }
  console.log(`Updating session for user ${req.body.userName}`);
  req.session.userName = req.body.userName;
  req.session.messageCounter = 0;
  res.send({ result: 'OK', message: 'Session updated' });
});

// Logging out clears out the session.
// Calling req.session.destroy does not work here.
app.delete('/logout', (request, response) => {
  console.log('Clearing out session for', request.session.userName);

  // Don't call request.session.destroy() to clear the session: When a new
  // session is created in '/login', that new session object will not be seen by
  // the callbacks for websocket messages.
  // Therefore, we're removing contents from the session-object, but keeping the session object itself intact.
  delete request.session.userName;
  delete request.session.messageCounter;
  response.send({ result: 'OK', message: 'Session cleared' });
});


// Create HTTP server by ourselves, in order to attach websocket server.
const httpServer = http.createServer(app);

// Create the Web socket server.  
const websocketServer = new WebSocket.Server({ noServer: true });

httpServer.on('upgrade', (req, networkSocket, head) => {  
  sessionParser(req, {}, () => {
    // The 'req' parameter contains the HTTP request that is for the upgrade
    // request to the websocket protocol.
    // We can refuse the upgrade request by returning from this function 
    // (and closing the networkconnection for this request)
    if (req.session.userName === undefined) {
      networkSocket.destroy(); 
      return;
    }
    
    console.log('Session is parsed and we have a User!');

      // Everything is fine. We tell the websocket server to 
      // initiate a new websocket connection for this request 
      // and emit a new connection event passing in the 
      // newly created websocket when the setup is complete
      websocketServer.handleUpgrade(req, networkSocket, head, newWebSocket => {
      websocketServer.emit('connection', newWebSocket, req);
    });
  });
});


websocketServer.on('connection', (socket, req) => {
  socket.on('message', (message) => {
    req.session.reload((err)=>{   // if we don't call reload(), we'll get a old copy
                                  // of the session, and won't see changes made by
                                  // Express routes (like '/logout', above)
      if(err) { throw err };

      if( req.session.userName == undefined ) {
        // The session does not contain the name of a user, so this this client
        // has probably logged out.
        // We'll simply ignore any messages from this client.
        console.log(`Ignoring message from logged out user: "${message}"` );
        return;
      }

      req.session.messageCounter ++;
      console.log(`${req.session.messageCounter}th WS message from ${req.session.userName}: "${message}"`);

      // broadcast this message to all connected browsers
      const outMessage = `[${req.session.userName} / ${req.session.messageCounter}]: ${message}`
      websocketServer.clients.forEach(function (client) {
        client.send(outMessage );
      })
      req.session.save()  // If we don't call save(), Express routes like '/logout' (above)
                          // will not see the changes we make to the session in this socket code.
    })
  });
});

//
// Start the server.
const port = process.env.PORT || 4000;
httpServer.listen(port, () => console.log(`Listening on http://localhost:${port}`));
