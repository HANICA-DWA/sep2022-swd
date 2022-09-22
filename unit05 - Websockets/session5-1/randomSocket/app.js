var http = require("http");
var ws = require("ws");
var express = require("express");
var path = require("path");

// Set up Express app and WS-server.
// WS needs access to httpServer, so we can't let Express create it's own.
// Luckily, Express apps can be installed on existing httpServers.
var app = express();
var httpServer = http.createServer(app);
var webSocketServer = new ws.Server({
  server: httpServer,
  path: "/random",
});

var port = 3000;

app.use(express.static(path.join(__dirname, "client-side")));

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

var i = 100;

webSocketServer.on("connection", function connection(websocket) {
  console.log(i++, "CONNECTION CREATED");

  websocket.on("message", function incoming(message) {
    console.log(i++, "MESSAGE RECEIVED: ", message);

    var messageObject = JSON.parse(message);
    websocket.randomMessageCount = 0;
    websocket.randomMessageCountMax = randomInt(10, 20);
    websocket.userName = messageObject.userName;

    function sendRandomValue() {
      var newMessage = {
        type: "randomValueMessage",
        userName: messageObject.userName,
        randomValue: randomInt(1, parseInt(messageObject.maxValue, 10) + 1),
      };
      var jsonStr = JSON.stringify(newMessage);

      webSocketServer.clients.forEach(function (client) {
        client.send(jsonStr);
        console.log(
          i++,
          "MESSAGE BROADCAST TO " + client.userName + ": ",
          newMessage
        );
      });

      websocket.randomMessageCount++;

      if (websocket.randomMessageCount >= websocket.randomMessageCountMax) {
        console.log(i++, "MAX COUNT: CLOSING");

        websocket.close();
      } else {
        console.log(i++, "COUNT:", websocket.randomMessageCount);

        websocket.timeoutObject = setTimeout(
          sendRandomValue,
          randomInt(1000, 3000)
        );
      }
    }

    sendRandomValue();
  });

  websocket.on("close", function () {
    console.log("CONNECTION FOR " + websocket.userName + " CLOSED.");
    if (websocket.timeoutObject) {
      clearTimeout(websocket.timeoutObject);
    }
  });
});

httpServer.listen(port, function () {
  console.log("Listening on " + httpServer.address().port);
});
