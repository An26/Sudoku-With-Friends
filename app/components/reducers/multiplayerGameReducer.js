export default function reducer(state={
    // createRoom: false,
    joinRoom: [],
    roomDetails: {},
    joinRoomId: '',
    playersGameBoard: []
}, action) {
    switch(action.type) {
        // case 'CREATE_ROOM':
        //     return {...state, createRoom: action.payload}
        case 'JOIN_ROOM':
            let roomData = [];
            action.payload.forEach(function(ele) {
                let data = {
                    id: ele._id,
                    players: ele.players.length,
                    roomName: ele.userRoomName
                }
                roomData.push(data);
            })
            return {...state, joinRoom: roomData}
         case 'ROOM_DETAILS':
            let details = {
                id: action.payload.id,
                roomLength: action.payload.roomLength
            }
            // console.log(details);
            return {...state, roomDetails: details}
        case 'JOIN_ROOM_ID':
            return {...state, joinRoomId: action.payload}
        case 'PLAYERS_GAME_BOARD':
            // console.log('playersdata', action.payload.players);
            return {...state, playersGameBoard: action.payload.players}
        default:
            return state;
    }
        
}