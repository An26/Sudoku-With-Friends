export default function reducer(state={
    logIn: false
}, action) {
    switch(action.type) {
        case 'FB_LOG_IN':
            return {...state, logIn:action.payload }
        case 'FB_LOG_OUT':
            return {...state, logIn:action.payload }
        default:
            return state;
    }
}