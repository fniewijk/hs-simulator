const EventEmitter = require('../eventEmitter/eventEmitter.js');
const gameEvents = require('./gameEvents.js');

module.exports = class{

    constructor (config){
        this.gameState = {
            round: 0,
            player: 0,
            players: [
                new config.players[0]({
                    health: 30,
                    hand: config.decks[0].slice(0,3)
                }),
                new config.players[1]({
                    health: 30,
                    hand: config.decks[1].slice(0,3)
                })
            ],
            decks: config.decks
        }
        this.eventEmitter = new EventEmitter();


        console.log('hi', this.gameState.players[0].alive);
        while(!this.participants.died && this.gameState.round <= 40) {
            this.nextRound();

        }
        return this.participants.alive;
    }

    nextRound() {
        this.gameState.round++;
        this.gameState.player = Math.abs(this.gameState.player-1);
        this.eventEmitter.pub(gameEvents.ROUND_START, {
            player: this.gameState.player
        });
    }

    participants() {
        return {
            died: !this.gameState.players[0].alive || !this.gameState.players[1].alive,
            alive: this.gameState.players[0].alive && this.gameState.players[1].alive,
        };
    }
};
