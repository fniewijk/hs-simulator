const EventEmitter = require('../eventEmitter/eventEmitter.js');
const gameEvents = require('../game/gameEvents.js');
const actionHelper = require('../helpers/actionHelper.js')

module.exports = class{

    constructor (playerState, opponentStateCallback, requestActionCallback){

        let that = this;
        this.playerState = playerState;
        this.opponentStateCallback = opponentStateCallback;
        this.eventEmitter = new EventEmitter();
        this.getOpponentState = this.simpleState;
        this.requestActionCallback = requestActionCallback;
        /*
        this.playerState = {
            health:30,
            hand:[],
            id:0
        }
        */

        const subIndex = this.eventEmitter.sub('player ' + this.playerState.id, 'all', function(type, message){

            switch(type){
                case gameEvents.ROUND_START:
                    that.roundStart(actionHelper(that.playerState, that.opponentStateCallback()));
                    break;
                case gameEvents.GAME_END:
                    that.eventEmitter.unsub(subIndex);
                    break;
                default:
                    break;
            }
            // if(message.id === this.playerState.id || !message.id){
            //     this.event(type, message);
            // }
            that.event(type, message, that.playerState);
        });

    }

    get alive() {
        return this.playerState.health > 0;
    }

    event (type, message, gameState) {
        //to be overwritten.
    }

    roundStart(actions) {
        //to be overwritten.
    }

    requestAction(action) {
        this.requestActionCallback(action);
    }

    get simpleState() {
        return  {
            id: this.playerState.id,
            mana: this.playerState.mana,
            handSize: this.playerState.hand.length,
            board: this.playerState.board,
            deckSize: this.playerState.deckSize,
            heroPower: this.playerState.heroPower
        };
    }


};
