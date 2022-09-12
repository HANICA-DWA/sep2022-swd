/** Using middleware in one route handler **/
 var express = require('express');

var app = express();

app.get('/',
    function(req, res, next) {
        console.log("middleware");
        next();
    },
    function(req, res, next) {
        var x = 0;
        if (x === 0) {
            next(new Error("oeps"));
        }
        res.send("response");
    }
    ,
    function(err, res, req, next) {
        console.log(err.message);
        next(); //now you don't need a next call in this situation
    },
);


app.listen(3000);


