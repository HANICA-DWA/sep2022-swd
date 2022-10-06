const express = require('express');
let app = express();

const map = {
    forest: {
        description: 'a forest',
        exits: ['town']
    },
    town: {
        description: 'a town',
        exits: ['forest', 'mountain']
    },
    mountain: {
        description: 'a mountain range',
        exits: ['town']
    }
}

app.get('/:location', (req, res) => {
    console.log(req.params.location);
    res.json(map[req.params.location]);
});

const server = app.listen(3001, () => {
    console.log(`map server running on port ${server.address().port}`);
});