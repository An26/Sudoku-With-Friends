export default function reducer(state={
    createRoom: false,
    gameRoomData: []
}, action) {
    switch(action.type) {
        case 'CREATE_ROOM':
            return {...state, createRoom: action.payload}
        case 'GAME_ROOM_DATA':
            let roomData = [];
            action.payload.forEach(function(ele) {
                console.log('le', ele)
                let data = {
                    id: ele._id,
                    players: ele.players.length,
                    roomName: ele.userRoomName
                }
                roomData.push(data);
            })
            return {...state, gameRoomData: roomData}
        default:
            return state;
    }
        
}