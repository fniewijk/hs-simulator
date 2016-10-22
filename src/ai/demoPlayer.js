const Player = require('../components/player/player.js');

module.exports = class extends Player {
    event (type, message) {
        //to be overwritten.
        console.log('player', type, message);
    }
}
