/** Forgetting to send a response **/
/** Every request handler needs to have a next or send (or friends like json, render, etc
 * otherwise the client won't get any response (and will hopefully timeout) **/

/** Comment and uncomment the next calls and the send call to show the effect **/

var express = require("express");

var app = express();

app.use(function mid(req, res, next) {
  console.log("A");
  next();
  console.log("B");
});

app.get("/", function end(req, res) {
  console.log("C");

  if (req.query.dir === "error") {
    console.log("D");
    return next(new Error("oops"));
  }

  res.send("ready!");
  console.log("E");
});

app.use(function (err, req, res, next) {
  console.log("F");
  next();
});

app.listen(3000);
