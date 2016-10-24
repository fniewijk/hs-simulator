const actionTypes = require('../types/actionTypes');

module.exports = function(playerState, opponentState){

    const actions = [{
        type: actionTypes.END_ROUND,
        message: {}
    }];
    // playerState = {
    //     mana:0,
    //     hand:[]
    //     board:[],
    //     deckSize:0,
    //     heroPower:'',
    //
    // }

    // opponentState = {
    //         mana:0,
    //         handSize:0,
    //         heroPower:'',
    //         deckSize:0,
    //         board:[]
    //     };
    //console.log('action helper', playerState, opponentState);

    console.log('hand helper', playerState.hand);

    for(let i=0; i < playerState.hand.length; i++){
        let card = playerState.hand;
        //TODO check mana cost yeah.
        //target is position on board.
        actions.push({
            type: actionTypes.PLAY,
            message: {
                id: card.id,
                target: 0
            }
        });
    }

    for(let i=0; i < playerState.board.length; i++){
        let minion = playerState.board[i];
        //TODO check for IMMUNE player and TAUNTED minions.
        actions.push({
            type: actionTypes.ATTACK,
            message: {
                id: minion.id,
                target: opponentState.id
            }
        });
    }

    console.log('actions', actions);
    return actions;
}
