const EventEmitter = require('../eventEmitter/eventEmitter.js');
const gameEvents = require('./gameEvents.js');

module.exports = class{

    constructor (config){

        //TODO change hand and deck into CARDS instead of ID's
        this.playerStates = [{
            id: 0,
            board:[],
            health: 30,
            heroPower:'',
            mana: 0,
            hand: config.decks[0].slice(0,3),
            deckSize: config.decks[0]
        },{
            id: 1,
            board:[],
            health: 30,
            heroPower:'',
            mana: 0,
            hand: config.decks[1].slice(0,4),
            deckSize: config.decks[1]
        }];

        this.players = [
            new config.players[0](this.playerStates[0], this.opponentStateCallback.bind(this, 1), this.gameActionCallback.bind(this, 0)),
            new config.players[1](this.playerStates[1], this.opponentStateCallback.bind(this, 0), this.gameActionCallback.bind(this, 1))
        ];

        this.gameState = {
            round: 0,
            playerTurn: 1,
            players: this.players,
            decks: config.decks
        }

        this.eventEmitter = new EventEmitter();

        this.eventEmitter.pub(gameEvents.GAME_START);
        this.eventEmitter.pub(gameEvents.GET_CARD, {
            playerId: 1,
            cardId: 0
        });

        while(!this.participants.died && this.gameState.round < 2) {
            this.nextRound();

        }
        this.eventEmitter.pub(gameEvents.GAME_END);

        return this.participants.alive;
    }

    nextRound() {
        this.gameState.round++;
        this.gameState.player = Math.abs(this.gameState.player-1);
        this.eventEmitter.pub(gameEvents.ROUND_START, {
            playerId: this.gameState.playerTurn
        });
    }

    participants() {
        return {
            died: !this.gameState.players[0].alive || !this.gameState.players[1].alive,
            alive: this.gameState.players[0].alive && this.gameState.players[1].alive,
        };
    }

    opponentStateCallback(playerId) {
        //console.log('opponentState', playerId, this.players[playerId].getState);
        return this.players[playerId].getOpponentState;
    }

    gameActionCallback(playerId, action) {
        console.log('action requested', playerId, action);
    }
};
