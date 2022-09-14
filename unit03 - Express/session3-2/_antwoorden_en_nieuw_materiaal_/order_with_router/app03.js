const express = require('express');
const app = express();

const studentRouter = express.Router();

app.use('/:student', studentRouter);

app.get('/students', (rea, res, next) => {
    console.log('0');
    res.json(null);
})

studentRouter.use((req, res, next) => {
    console.log("A");
    return next();

});

studentRouter.get('/', (req, res) => {
    console.log('B');
    res.json(['hanneke', 'femke', 'icarus']);
});


app.listen(3000);