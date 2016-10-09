const baseSet = require('../../../data/cards/base/cards.json');
const CardSetTypes = require('./cardSetTypes.js')

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
