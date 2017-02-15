import cookie from 'react-cookie';

export default function reducer(state={
    loggedIn: !!cookie.load('username')
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