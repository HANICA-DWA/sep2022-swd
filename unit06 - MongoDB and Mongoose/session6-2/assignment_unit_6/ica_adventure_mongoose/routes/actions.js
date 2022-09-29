'use strict';

const mongoose = require('mongoose');
require('../model/player.js');

const express = require('express');
const router = express.Router();

const Player = mongoose.model('Player');
//Don't forget to get your hands on the Location model when you need it.

router.get('/:player/where', (req, res) => {
    res.json('replace me with your code');
});

router.put('/:player/goto', (req, res) => {
    res.json('replace me with your code');
});



module.exports = router;