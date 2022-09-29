'use strict';

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const actionsRouter = require('./routes/actions');

const dbName = 'ica-adventure';

const app = express();

app.use(bodyParser.json());

app.use('/', actionsRouter);

const server = app.listen(3000, () => {
    mongoose.connect(`mongodb://localhost:27017/${dbName}`,  {useNewUrlParser: true }, () => {
        console.log(`game server started on port ${server.address().port}`);
    });
});