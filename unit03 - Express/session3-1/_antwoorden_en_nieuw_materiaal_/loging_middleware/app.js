"use strict";

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.path}`);
  next();
});

app.get("/test1", (req, res) => {
  res.json({ result: "test1" });
});

app.get("/test2", (req, res) => {
  res.json({ result: "results for test 2" });
});

const server = app.listen(3000, () => {
  console.log(`game server started on port ${server.address().port}`);
});
