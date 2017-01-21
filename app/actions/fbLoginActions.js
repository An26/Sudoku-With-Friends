export function fbLogIn(username) {
    if(username) {
        return {
            type: 'FB_LOG_IN',
            payload: true
        } 
    } else {
        return {
            type: "FB_LOG_IN",
            payload: false
        }
    }
}

export function fbLogOut() {
    return{
        type: 'FB_LOG_OUT',
        payload: false
    }
}