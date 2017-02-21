export default function reducer(state={
    gameType: 'multi'
}, action) {
    switch(action.type) {
        case 'GAME_TYPE':           
            return {...state, gameType:action.payload }
        default:
            return state;
    }
}