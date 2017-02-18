// export function createRoom() {
//     return {
//         type: 'CREATE_ROOM',
//         payload: true
//     }
// }

export function setRooms(availableRooms) {
    return {
        type: 'SET_ROOMS',
        payload: availableRooms
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
