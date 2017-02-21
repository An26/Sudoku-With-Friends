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
        console.log('payload', action.payload);
            let userObject = action.payload[0] || action.payload;
            let username = userObject.name;
            let userId = userObject._id;
            let email = userObject.email;
            cookie.save('username', username);
            cookie.save('userId', userId);
            cookie.save('email', email);
            return {...state, userLoginDetails: action.payload}
        default:
            return state;
    }
}