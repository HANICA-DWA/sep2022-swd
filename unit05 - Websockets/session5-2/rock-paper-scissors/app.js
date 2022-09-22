var express = require("express");
var ws = require("ws");
var http = require("http");
var path = require("path");

var theExpressApp = express();
var theHttpServer = http.createServer();
var theWebSocketServer = new ws.Server({
  server: theHttpServer,
});

// code to setup the Express app (middleware, routes) can go here.
theExpressApp.use(express.static(path.join(__dirname, "client-side")));

// code to setup event listeners for WebSocket communication can go here

// connect the Express app to all incoming requests on the HTTP server
theHttpServer.on("request", theExpressApp);
theHttpServer.listen(3000, function () {
  console.log("The Server is listening on port 3000.");
});
