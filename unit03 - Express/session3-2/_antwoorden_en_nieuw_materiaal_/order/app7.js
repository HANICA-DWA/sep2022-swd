/* sync vs async throwing */
var express = require('express');

var app = express();


/* Sync */
app.get('/', function(req, res, next) {
    console.log('A');
    throw new Error('a SYNC error');
    console.log('B');
});

/* ASync */
// app.get('/', function(req, res, next) {
//     console.log('A');
//     setTimeout(function() {
//         throw new Error('ASYNC error');    
//     }, 1);
//     console.log('B');
// });



app.use(function(err, req, res, next) {
    console.log('C');
    res.send('an error');
    console.log('D');
});

app.listen(3000);