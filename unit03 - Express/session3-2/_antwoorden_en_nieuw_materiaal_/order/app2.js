/** Using return next on line 9 **/

var express = require('express');

var app = express();

app.use(function(req, res, next) {
    console.log("A");
    return next();
    console.log("B");
});

app.get('/', function(req, res) {
    console.log("C");
    res.send("ready!");
    console.log("D");
});

app.listen(3000);
