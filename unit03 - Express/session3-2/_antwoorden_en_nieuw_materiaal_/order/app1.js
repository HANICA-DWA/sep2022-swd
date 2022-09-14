/** Basic example **/

var express = require('express');

var app = express();

console.log("A");

app.use(function(req, res, next) {
    console.log("B");
    next();
    console.log("C");
});

app.get('/', function(req, res) {
    console.log("D");
    res.send("ready!");
    console.log("E");
});

console.log("F");

app.listen(3000);


