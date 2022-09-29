const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server: WebSocketServer } = require("ws");

const app = express();
const http = createServer();
const wss = new WebSocketServer({ server: http });

// code to setup the Express app (middleware, routes) can go here; eg:
app.use(express.static(path.join(__dirname, "client-side")));

// game logic
//
// params
//  `myChoice` and `opponentChoice` must be a value of `'rock'|'paper'|'scissors'`
// returns
//  `undefined` when tie, `myChoice` if winner or `opponentChoice` if winner
//
// function playGame(choice1, choice2) {
function playGame({ myChoice, opponentChoice }) {
  const rules = {
    rock: { scissors: true, paper: false },
    scissors: { rock: false, paper: true },
    paper: { rock: true, scissors: false },
  };

  // turn choices into lowercase for 'key' lookup
  [myChoice, opponentChoice] = [myChoice, opponentChoice].map((_) =>
    _.toLowerCase()
  );

  if (myChoice !== opponentChoice) {
    return rules[myChoice][opponentChoice] ? myChoice : opponentChoice;
  }
  return undefined;
}

// message-types for the client-server communication
// prettier-ignore
const messages = {
  choiceAccepted    : (data) => ({ messageType: "CHOICE ACCEPTED"}),
  choiceNotAccepted : (data) => ({ messageType: "CHOICE NOT ACCEPTED", ...data}),
  opponentChoice    : (data) => ({ messageType: "OPPONENT CHOICE", ...data}),
  win               : (data) => ({ messageType: "WIN", ...data}),
  loose             : (data) => ({ messageType: "LOOSE", ...data}),
  tie               : (data) => ({ messageType: "TIE"}),
  opponentLeft      : (data) => ({ messageType: "OPPONENT LEFT", ...data}),
};

// send winner and loser to clients
function declareWinner({ wsWinner, wsLoser }) {
  const [winner, loser] = [wsWinner.state, wsLoser.state];

  winner.score++;
  wsWinner.sendJSON(
    messages.win({
      opponentName: loser.userName,
      opponentScore: loser.score,
      ownScore: winner.score,
    })
  );
  wsLoser.sendJSON(
    messages.loose({
      opponentName: winner.userName,
      opponentScore: winner.score,
      ownScore: loser.score,
    })
  );
}

// send tie to clients
function declareTie(wss) {
  wss.broadcast(messages.tie());
}

// code to setup event listeners for WebSocket communication can go here
//
// add `broadcast()` utility function to this `wss` WebSocketsServer
wss.broadcast = (data) => wss.clients.forEach((_) => _.sendJSON(data));

// WebSocketsServer on connection event
wss.on("connection", (ws) => {
  // add `sendJSON()` utility function to this `ws` WebSocket
  ws.sendJSON = (data) => {
    ws.send(JSON.stringify(data));
  };

  //
  // TODO: add `score`, `choice` and `userName` as 'state' to this `ws` Websocket
  //

  // WebSocket on message event
  ws.on("message", (data) => {
    //
    // TODO: check if `choice` has already a value, if so,
    //        send `choiceNotAccepted` and return
    //

    //
    // TODO: parse `data` into `choice` and `userName` and keep 'state' updated,
    //        send `choiceAccepted`
    //

    //
    // DONE: check if at least 2 clients are connected,
    //        if so, send `opponentChoice` to opponent
    //
    if (wss.clients.size > 1) {
      // there is an opponent, send it: i have chosen
      const wsOpponent = [...wss.clients].filter((client) => client != ws)[0];
      wsOpponent.sendJSON(messages.opponentChoice({ opponentName: userName }));

      //
      // TODO: check if opponent `choice` also has a value, if so, play the game
      //
      //        make use if possible of pre-declared functions, such as,
      //        `playGame()`, `declareWinner()` and `declareTie()`
      //
      if ( ... ) {

        //
        // TODO: clear all `choice`'s from  all WebsocketServer's `clients`
        //
      }
    }
  });

  // on WebSocket close event
  ws.on("close", () => {
    console.log("[ws]   close");

    if (ws.state.userName != undefined) {
      wss.broadcast(messages.opponentLeft({ opponentName: ws.state.userName }));
    }
  });
});

// connect the Express `app` to all incoming requests on the `http` server
http.on("request", app);
http.listen(3000, () => {
  console.log("The Server is listening on port 3000.");
});
