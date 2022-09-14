/** Error handling middleware **/
var express = require('express');

var app = express();

app.use(function(req, res, next) {
    console.log("A");
    return next("oh noes");

});

app.get('/', function(req, res) {
    console.log("B");
    res.send("ready!");
    console.log("D");
});

app.use(function(err, req, res, next) {
    console.log("E");
    res.send("error");
    console.log("F");
});

app.listen(3000);