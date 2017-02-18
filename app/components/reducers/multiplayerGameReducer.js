export default function reducer(state={
    // createRoom: false,
    availableRooms: [],
    roomDetails: {},
    joinRoomId: '',
    solutionGameBoard: [],
}, action) {
    switch(action.type) {
        // case 'CREATE_ROOM':
        //     return {...state, createRoom: action.payload}
        case 'SET_ROOMS':
            let roomData = [];
            action.payload.forEach(function(ele) {
                let data = {
                    id: ele._id,
                    players: ele.players.length,
                    roomName: ele.userRoomName
                }
                roomData.push(data);
            })
            return {...state, availableRooms: roomData}
         case 'ROOM_DETAILS':
            let details = {
                id: action.payload.id,
                roomLength: action.payload.roomLength
            }
            // console.log(details);
            return {...state, roomDetails: details}
        case 'JOIN_ROOM_ID':
            return {...state, joinRoomId: action.payload}
        default:
            return state;
    }
        
}