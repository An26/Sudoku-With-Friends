export function createRoom() {
    return {
        type: 'CREATE_ROOM',
        payload: true
    }
}

export function roomName(roomName) {
    return {
        type: 'ROOM_NAME',
        payload: roomName
    }
}

export function gameRoomData(roomData) {
    return {
        type: 'GAME_ROOM_DATA',
        payload: roomData
    }
}
