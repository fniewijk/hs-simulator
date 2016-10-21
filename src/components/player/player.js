const EventEmitter = require('../eventEmitter/eventEmitter.js');
const gameEvents = require('../game/gameEvents.js');

module.exports = class{

    constructor (gameState){

        this.gameState = gameState;
        this.eventEmitter = new EventEmitter();
        /*
        this.gameState = {
            health:30,
            deck:[],
            id:0
        }
        */

        const subIndex = this.eventEmitter.sub('all', function(type, message){

            switch(type){
                case gameEvents.GAME_END:
                    this.eventEmitter.unsub(subIndex);
                    break;
            }
            // if(message.id === this.gameState.id || !message.id){
            //     this.event(type, message);
            // }
            this.event(type, message);
        });

    }

    get alive() {
        return this.gameState.health > 0;
    }

    event (type, message) {
        //to be overwritten.
    }


};
