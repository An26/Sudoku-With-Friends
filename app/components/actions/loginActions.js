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