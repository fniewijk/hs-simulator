const cardType = require('../types/cardType.js');
const aspectTypes = require('../types/aspectTypes.js');

module.exports = class{

    let health = 0;
    let attack = 0;
    let aspectArray = [];

    constructor (config){
        const defaultConfig = {
            aspects: []
        };

        health = config.health;
        attack = config.attack;
    }

    hit(points) {
        if(!this.getAspect(aspectTypes.IMMUNE)){
            this.health -= points;
        }

        if(this.health <= 0){
            die();
        }
        return this.alive();
    }

    get alive() {
        this.health > 0;
    }

    get targetAble() {
        !(this.getAspect(aspectTypes.STEALTH) || !this.getAspect(aspectTypes.DEAD));
    }

    die() {
        this.setAspect(aspectTypes.DEAD);
    }

    get Aspect(aspect) {
        //for(let i = 0; i++; i < this.aspectArray) {
        for(let minionAspect of this.aspectArray)
            if(aspect === minionAspect) {
                return true;
            }
        }
    }

    set aspect(aspect) {
        if(!this.getAspect(aspect)){
            this.aspectArray.push(aspect)
        }

    }
}
