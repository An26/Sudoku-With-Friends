export function gameRunning(isGameRunning) {
    return {
        type: 'GAME_RUNNING',
        payload: isGameRunning
    }
}

export function timeInterval() {
    return {
        type: 'TIME'
    }
}

export function stopTimeInterval() {
    return {
        type: 'CLEAR_INTERVAL'
    }
}
