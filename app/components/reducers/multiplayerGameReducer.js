export default function reducer(state={
    createRoom: false,
    joinRoom: [],
    roomDetails: '',
    joinRoomId: '',
    opponentsGameBoard: []
}, action) {
    switch(action.type) {
        case 'CREATE_ROOM':
            return {...state, createRoom: action.payload}
        case 'JOIN_ROOM':
            let roomData = [];
            action.payload.forEach(function(ele) {
                // console.log('le', ele)
                let data = {
                    id: ele._id,
                    players: ele.players.length,
                    roomName: ele.userRoomName
                }
                roomData.push(data);
            })
            return {...state, joinRoom: roomData}
         case 'ROOM_DETAILS':
            return {...state, roomDetails: action.payload}
        case 'JOIN_ROOM_ID':
            return {...state, joinRoomId: action.payload}
        case 'OPPONENTS_GAME_BOARD':
            return {...state, opponentsGameBoard: action.payload}
        default:
            return state;
    }
        
}