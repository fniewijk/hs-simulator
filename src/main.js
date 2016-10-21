(function(){



const Game = require('./components/game/game.js');

const deckOne = require('../data/decks/playerOne.json');
const deckTwo = require('../data/decks/playerTwo.json');

const CardLoader = require('./components/cardLoader/cardLoader.js');
const cardSetTypes = require('./components/types/cardSetTypes.js');

const DemoPlayer = require('./ai/demoPlayer.js');

const cardLoader = new CardLoader();

const config = {
    cards: cardLoader.getSet(cardSetTypes.ALL),
    decks: [
        deckOne,
        deckTwo
    ],
    players: [
        DemoPlayer,
        DemoPlayer,
    ]
};

console.log('start game');
const game = new Game(config);


})();
