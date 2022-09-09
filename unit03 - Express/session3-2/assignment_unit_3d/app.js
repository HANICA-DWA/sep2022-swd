'use strict';

const express = require('express');
const Game = require('./game.js');
const promiseWrappers = require('./promise-wrappers');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const gameFilesFolderName = 'game_files';

app.use(bodyParser.json());

const gameFileReader = async (req, res, next) => {
  //TODO D1, D2
} 

app.use(/* TODO D1 */);


const gameStateReader; //TODO D3

app.get('/action/:player/where', async (req, res) => {
    const fileName = path.join(gameFilesFolderName, `${req.params.player}.json`);
    const fileContent = await promiseWrappers.readFileP(fileName);
    const gameState = JSON.parse(fileContent);
    const game = new Game(gameState);
    const locationInformation = await game.getLocationInformation();
    res.json(locationInformation);
});


app.post('/action/:player/goto', async (req, res) => {
   //Paste your implementation from assignment unit 3c here
});

app.post('/action/:player/arise', async (req, res) => {
  //Paste your implementation from assignment unit 3c here
});

const server = app.listen(3000, () => {
    console.log(`game server started on port ${server.address().port}`);
});