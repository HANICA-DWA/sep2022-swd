const promiseWrappers = require('../promise-wrappers');
const path = require('path');
const session = require('express-session');

const express = require('express');

let router = express.Router();

const playerFilesFolderName = 'player_files';

router.post('/register', async (req, res) => {
    const fileName = path.join(playerFilesFolderName, `${req.body.player}.json`);
    const fileData = JSON.stringify({
        password: req.body.password
    });

    await promiseWrappers.writeFileP(fileName, fileData);
    res.json("Sign Up!"); 
});

router.post('/login', async (req, res) => {
    const player = req.body.player
    const fileName = path.join(playerFilesFolderName, `${player}.json`);
    
    const data = await promiseWrappers.readFileP(fileName);
    const storedPassword = JSON.parse(data).password;
    
    if (storedPassword === req.body.password) {
        req.session.player = player;
    
        res.json('Sign In!');
    } else {
        res.json('Player Name or Password Incorrect!');
    }

});

router.post('/logout', (req, res) => {
    delete req.session.player;
    res.json('Sign Out!');
});

module.exports = router;