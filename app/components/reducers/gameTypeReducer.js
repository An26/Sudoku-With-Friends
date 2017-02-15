export default function reducer(state={
    gameType: 'single'
}, action) {
    switch(action.type) {
        case 'GAME_TYPE':           
            return {...state, gameType:action.payload }
        default:
            return state;
    }
}