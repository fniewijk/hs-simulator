module.export = class{

    let health = 0;
    let aspectArray = [];

    constructor (config){
        const defaultConfig = {
            aspects: {

            }
        };
        //config merge.

    }

    hit(points) {
        if(!this.getAspect(aspectType.IMMUNE)){
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
        !(this.getAspect(aspectType.STEALTH) || !this.getAspect(aspectType.DEAD));
    }

    die() {
        this.setAspect(aspectType.DEAD);
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
