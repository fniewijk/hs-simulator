/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function(){



	const Game = __webpack_require__(1);

	const deckOne = __webpack_require__(2);
	const deckTwo = __webpack_require__(3);

	const CardLoader = __webpack_require__(4);
	const cardSetTypes = __webpack_require__(6);

	const DemoPlayer = __webpack_require__(7);

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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const EventEmitter = __webpack_require__(10);
	const gameEvents = __webpack_require__(13);

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = [
		1,
		2,
		3
	];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = [
		2,
		2,
		2
	];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const baseSet = __webpack_require__(5);
	const CardSetTypes = __webpack_require__(6)

	module.exports = class{

	    constructor (){
	        this.all = baseSet;
	    }

	    getSet(setType) {
	        switch(setType) {
	            case CardSetTypes.BASE:
	                return baseSet;
	            default:
	                return this.all;
	        }
	    }
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = [
		{
			"id": 1,
			"cost": 1,
			"description": "2/1 for 1 mana",
			"type": "MINION",
			"stats": {
				"attack": "2",
				"health": "1"
			}
		},
		{
			"id": 2,
			"cost": 2,
			"description": "2/2 for 2 mana",
			"type": "MINION",
			"stats": {
				"attack": "2",
				"health": "2"
			},
			"events": [
				{
					"type": "ROUND_START",
					"action": {
						"type": "ATTACK_INCREASE",
						"target": "SELF",
						"requirements": [
							{
								"type": "ON_BOARD"
							}
						],
						"value": "1"
					}
				}
			]
		},
		{
			"id": 3,
			"cost": 3,
			"description": "3/3 for 2 mana",
			"type": "MINION",
			"stats": {
				"attack": "3",
				"health": "3"
			}
		}
	];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = {
	    ALL: 'all',
	    BASE: 'base'
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Player = __webpack_require__(8);

	module.exports = class extends Player {
	    event (type, message) {
	        //to be overwritten.
	        console.log(type, message);
	    }
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const EventEmitter = __webpack_require__(10);
	const gameEvents = __webpack_require__(13);

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


/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	let instance = null;

	module.exports = class EventEmitter{

	    constructor() {
	        if(!instance){
	              instance = this;
	              this.init();
	        }

	        return instance;
	     }

	     init() {
	         this.index = 0;
	         this.subs = [];
	     }

	     sub(id, type, callback){

	         const newIndex = this.index;
	         this.subs.push({
	             index: newIndex,
	             id: id,
	             type: type,
	             callback: callback
	         })
	         this.index++;
	         return newIndex;
	     }

	     unsub(index){
	         const foundIndex = -1;
	         for(let i; i < this.subs.length; i++) {
	             if(index === this.subs[i].index){
	                 foundIndex = i;
	                 break;
	             }
	         }
	         if(foundIndex > 0) {
	             this.subs = this.subs.splice(foundIndex, 1);
	         }
	     }

	     pub(type, message) {
	         console.log('pub', 'type', 'message');
	          for(let i; i < this.subs.length; i++) {
	              if(type === this.subs[i].type || this.subs[i].type === 'all'){
	                 this.subs[i].callback(message);
	              }
	          }
	     }

	}


/***/ },
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	module.exports = {
	    GAME_START: 'GAME_START',
	    GAME_END: 'GAME_END',
	    ROUND_START: 'ROUND_START',
	    ROUND_END: 'ROUND_END',
	    MULLIGAN_START: 'MULLIGAN_START',
	    MULLIGAN_END: 'MULLIGAN_END',
	    ATTACK: 'ATTACK',
	    ATTACK_COMPLETE: 'ATTACK_COMPLETE'

	};


/***/ }
/******/ ]);