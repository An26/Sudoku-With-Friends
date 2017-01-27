export function gameRunning(isGameRunning) {
    return {
        type: 'GAME_RUNNING',
        payload: isGameRunning
    }
}

export function timeRemaining(remainingTime) {
    return {
        type: 'TIME',
        payload: remainingTime
    }
}