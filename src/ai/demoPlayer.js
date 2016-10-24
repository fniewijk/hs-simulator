const Player = require('../components/player/player.js');

module.exports = class extends Player {
    event (type, message, gameState) {
        //to be overwritten.
        //console.log('player', gameState.id, type, message);
    }

    roundStart(actions) {
        //to be overwritten.
        if(actions.length > 1){
            super.requestAction(actions[1]);
        }
        //action 0 is always end the turn
        super.requestAction(actions[0]);
    }
}
