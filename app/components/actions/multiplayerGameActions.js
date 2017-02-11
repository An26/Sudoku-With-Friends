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
