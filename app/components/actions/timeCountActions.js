export function gameRunning(isGameRunning) {
    return {
        type: 'GAME_RUNNING',
        payload: isGameRunning
    }
}

export function timeInterval(timeInterval) {
    return {
        type: 'TIME',
        payload: timeInterval
    }
}

export function stopTimeInterval() {
    return {
        type: 'CLEAR_INTERVAL'
    }
}
