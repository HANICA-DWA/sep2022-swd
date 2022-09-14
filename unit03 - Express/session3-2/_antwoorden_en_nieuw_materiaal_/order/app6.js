/** Async **/
var express = require('express');

var app = express();

app.use(function(req, res, next) {
    console.log("A");

    setTimeout(function() {
        console.log("B");
        console.log("C");
    }, 1);

    console.log("D");
    return next();

});

app.get('/', function(req, res) {
    console.log("E");

    setTimeout(function() {
        console.log("F");
        res.send("ready!");
        console.log("G");
    }, 1);

    console.log("H");
});

app.listen(3000);