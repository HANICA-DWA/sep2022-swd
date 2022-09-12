/** What if you want to add information in your middleware that is bound to a specific
 *  request?
 *
 *  Add an object to the request object. This is also how body-parser works.
 *
 **/

var express = require('express');

var app = express();

/** We can't do this, because we want to be request specific **/
//var myExample = {
//    date: Date.now
//};


app.use(function(req, res, next) {
    req.myExample = {
        date: Date.now()
    };
    next();
});

app.get('/', function(req, res) {
    console.log(req.myExample);
    res.send("ready!");
});


app.listen(3000);