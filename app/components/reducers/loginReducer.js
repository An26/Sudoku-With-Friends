export default function reducer(state={
    loggedIn: false
}, action) {
    switch(action.type) {
        case 'LOG_IN':           
            return {...state, loggedIn:action.payload }
        case 'LOG_OUT':
            return {...state, loggedIn:action.payload }
        default:
            return state;
    }
}