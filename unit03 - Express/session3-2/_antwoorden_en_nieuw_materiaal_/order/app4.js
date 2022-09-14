/** Error handling middleware 2 **/
var express = require('express');

var app = express();

app.use(function(req, res, next) {
    console.log("A");
    next();
    console.log("B");

});

app.get('/', function(req, res, next) {
    console.log("C");

    if ("error" === "error") {
        console.log("D");
        next(new Error("oops"));
    }

    res.send("ready!");
    console.log("E");
});

app.use(function(err, req, res, next) {
    console.log("F");
    next();
});

app.listen(3000);