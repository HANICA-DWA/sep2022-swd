const express = require('express');
const app = express();

const studentRouter = express.Router();

app.get('/students', (rea, res, next) => {
    console.log('0');
    res.json(null);
});

app.use('/students', studentRouter);

studentRouter.use((req, res, next) => {
    console.log("A");
    return next();

});

studentRouter.get('/', (req, res, next) => {
    console.log('B');
    res.json(['hanneke', 'femke', 'icarus']);
    next();
});


app.listen(3000);