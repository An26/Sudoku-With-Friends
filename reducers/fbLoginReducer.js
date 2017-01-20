export default function reducer(state={
    loggedIn: false
}, action) {
    switch(action.type) {
        case 'loggedIn':
            return {...state, loggedIn:something }
        default:
            return state;
    }
}