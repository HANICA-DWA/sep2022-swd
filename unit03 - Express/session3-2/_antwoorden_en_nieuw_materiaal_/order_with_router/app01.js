const express = require('express');
const app = express();

const studentRouter = express.Router();

app.use('/students', studentRouter);

studentRouter.use((req, res, next) => {
    console.log("A");
    return next();

});

studentRouter.get('/students', (req, res) => {
    console.log('B');
    res.json(['hanneke', 'femke', 'icarus']);
});


app.listen(3000);