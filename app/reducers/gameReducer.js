
export default function reducer(state={
    gameRunning: false,
    counter: ''
}, action) {
    switch(action.type) {
        case 'GAME_RUNNING':
            return {...state, gameRunning: action.payload}
        case 'TIME':
            return {...state, counter: action.payload}
        default:
            return state;
    }
}