/** Middleware tussen twee routehandlers in  **/
var express = require('express');

var app = express();

app.use(function(req, res, next) {
    console.log("A");
    return next();

});

// app.get(function(req, res) {
//     console.log("B");
//     res.send("klaar!");
//     console.log("C");
// });

app.get('/*', function(req, res) {
    console.log("B");
    res.send("klaar!");
    console.log("C");
});


app.get('/echt', function(req, res) {
    console.log("D");
    res.send("echt klaar");
});


app.listen(3000);