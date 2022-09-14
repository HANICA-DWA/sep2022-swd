const express = require('express');

const app = express();

// Willekeureige demo route handler
app.get('/', (req, res) => {
    res.json('hello express, geen errors hier');
});

// Plaats deze gewone middleware onder alle andere routes,
// zodat je hier alleen komt als het request niet door een 
// andere route handler wordt afgevangen
app.use((req, res, next) => {
    const error = new Error('route not found')
    error.code = 404;
    next(error);
});

// Deze error handler stuurt alle errors terug als json
app.use((err, req, res, next) => {
    res.status(err.code).json({'message': err.message});
});

app.listen(3000, () => {
    console.log('server started');
});