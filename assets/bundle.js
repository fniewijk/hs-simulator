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

	const Game = __webpack_require__(1);
	const Player = __webpack_require__(3);
	const deckOne = __webpack_require__(4);
	const deckTwo = __webpack_require__(5);

	const CardLoader = __webpack_require__(6);
	const cardSetTypes = __webpack_require__(8);


	const cardLoader = new CardLoader();

	const config = {
	    cards: cardLoader.getMinions(cardsSetType.ALL),
	    decks: [
	        deckOne,
	        deckTwo
	    ]
	}

	const game = new Game(config);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {module.export = class{

	    constructor (decks){
	        this.round = 0;
	        //return the game.

	        while(!participants.died && rounds <= 40) {
	            this.nextRound(participants.changePlayer);
	        }
	        return participants.alive;

	    }

	    nextRound() {
	        this.round++;
	    }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = [
		1,
		2,
		3
	];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = [
		2,
		2,
		2
	];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const baseSet = __webpack_require__(7);
	const CardSetTypes = __webpack_require__(8)

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
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	module.exports = {
	    ALL: 'all',
	    BASE: 'base'
	};


/***/ }
/******/ ]);