const Game = require('../game.js');
const promiseWrappers = require('../promise-wrappers');
const path = require('path');

const express = require('express');

let router = express.Router();

const gameFilesFolderName = 'game_files';

router.get('/listPlayerFiles', async (req, res) => {
    const files = await promiseWrappers.readdirP(gameFilesFolderName);
    res.json(files);
});

router.post('/deletePlayerFile/:player', async (req, res) => {
    const fileName = path.join(gameFilesFolderName, `${req.params.player}.json`);
    await promiseWrappers.unlinkFileP(fileName);
    res.json({result: `player ${req.params.player} deleted`});
   
});

router.post('/createPlayerFile', async (req, res) => {
    const fileName = path.join(gameFilesFolderName, `${req.body.player}.json`);
    await promiseWrappers.createEmptyFileP(fileName)
    res.json({result: `Data for player ${req.body.player} created`});
});

module.exports = router;