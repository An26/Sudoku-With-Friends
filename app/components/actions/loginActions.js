export function logIn(username) {
    if(username) {
        return {
            type: 'LOG_IN',
            payload: true
        } 
    } else {
        return {
            type: "LOG_IN",
            payload: false
        }
    }
}

export function logOut() {
    return{
        type: 'LOG_OUT',
        payload: false
    }
}

export function userLoginDetails(userLoginDetails) {
    return{
        type: 'USER_LOGIN_DETAILS',
        payload: userLoginDetails
    }
}