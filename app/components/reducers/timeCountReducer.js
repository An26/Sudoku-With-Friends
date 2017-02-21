
export default function reducer(state={
    gameRunning: false,
    timeInterval: 0
}, action) {
    switch(action.type) {
        case 'GAME_RUNNING':
            return {...state, gameRunning: action.payload}
        case 'TIME':
            let time = state.timeInterval + 1;
            return {...state, timeInterval: time}
        case 'CLEAR_INTERVAL':
            return {...state, timeInterval: 0}
         case 'GAME_STOP':
            return {...state, gameRunning: false, timeInterval: 0}
            // return {...state, timeInterval: 0}
        default:
            return state;
    }
}