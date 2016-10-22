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

        const eventFunction = this.event;
        const eventEmitterFunction = this.eventEmitter;

        const subIndex = this.eventEmitter.sub('player ' + this.gameState.id, 'all', function(type, message){

            switch(type){
                case gameEvents.GAME_END:
                    eventEmitterFunction.unsub(subIndex);
                    break;
            }
            // if(message.id === this.gameState.id || !message.id){
            //     this.event(type, message);
            // }
            eventFunction(type, message);
        });

    }

    get alive() {
        return this.gameState.health > 0;
    }

    event (type, message) {
        //to be overwritten.
    }


};
