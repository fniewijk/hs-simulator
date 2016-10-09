const Game = require('./components/game/game.js');
const Player = require('./components/player/player.js');
const deckOne = require('../data/decks/playerOne.json');
const deckTwo = require('../data/decks/playerTwo.json');

const CardLoader = require('./components/cardLoader/cardLoader.js');
const cardSetTypes = require('./components/cardLoader/cardSetTypes.js');


const cardLoader = new CardLoader();

const config = {
    cards: cardLoader.getMinions(cardsSetType.ALL),
    decks: [
        deckOne,
        deckTwo
    ]
}

const game = new Game(config);
