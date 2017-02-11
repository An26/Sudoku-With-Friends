export function createRoom() {
    return {
        type: 'CREATE_ROOM',
        payload: true
    }
}

export function joinRoom(roomData) {
    return {
        type: 'JOIN_ROOM',
        payload: roomData
    }
}

export function roomDetails(id) {
    return {
        type: 'ROOM_DETAILS',
        payload: id
    }
}

export function joinRoomId(id) {
    return {
        type: 'JOIN_ROOM_ID',
        payload: id
    }
}

export function opponentsGameBoard(gameBoard) {
    return {
        type: 'OPPONENTS_GAME_BOARD',
        payload: gameBoard
    }
}
