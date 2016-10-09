module.export = class{

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
