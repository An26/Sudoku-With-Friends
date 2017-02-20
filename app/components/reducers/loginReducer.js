import cookie from 'react-cookie';

export default function reducer(state={
    loggedIn: !!cookie.load('username'),
    userLoginDetails: {}
}, action) {
    switch(action.type) {
        case 'LOG_IN':           
            return {...state, loggedIn:action.payload }
        case 'LOG_OUT':
            return {...state, loggedIn:action.payload }
        case 'USER_LOGIN_DETAILS':
            let username = action.payload.name;
            let userId = action.payload._id;
            let email = action.payload.email 
            cookie.save('username', username);
            cookie.save('userId', userId);
            cookie.save('email', email);
            return {...state, userLoginDetails: action.payload}
        default:
            return state;
    }
}