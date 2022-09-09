'use strict';
const fetch = require('node-fetch');

class Game {
    constructor(state = null) {
        if (state !== null) {
            this._player = state.player;
            this._map = state.map;
        }
    }

    get state() {
        return {
            player: this._player,
            map: this._map
        };
    }
    
    async goToLocation(locationName) {
        if (this._map[this._player.location].exits.includes(locationName)) {
            if (this._map.hasOwnProperty(locationName)) {
                this._player.location = locationName;
            }
            else {
                const res = await fetch(`http://localhost:3001/${locationName}`);
                const location = await res.json(); 
                this._map[locationName] = location;           
                this._player.location = locationName;
            }
        }
     
        return this._map[this._player.location].description;
    }

    async getLocationInformation() {
        const playerLocation = this._map[this._player.location];
        
        let locationInfo = {
            description: playerLocation.description,
            exits: playerLocation.exits
        };
    
        return locationInfo;
    }

    async startNew(startLocation = 'town', inventory = []) {
        this._player = {
            location: startLocation,
            items: inventory
        };
        this._map = {};
        const res = await fetch(`http://localhost:3001/${startLocation}`);
        const location = await res.json(); 
        this._map[startLocation] = location;

        return this._map[this._player.location].description;
    }
    
}


module.exports = Game;