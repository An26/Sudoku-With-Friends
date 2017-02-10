export default function reducer(state={
    createRoom: false,
    roomName: '',
    gameRoomData: []
}, action) {
    switch(action.type) {
        case 'CREATE_ROOM':
            return {...state, createRoom: action.payload}
        case 'ROOM_NAME':
            // let id = state.roomID+1;
            // let newId = action.payload+id
            return{...state, roomName:action.payload}
        case 'GAME_ROOM_DATA':
            console.log('load', action.payload)
            let roomData = [];
            action.payload.forEach(function(ele) {
                let data = {
                    id: ele._id,
                    players: ele.players.length
                }
                roomData.push(data);
            })
            return {...state, gameRoomData: roomData}
            return state;
        default:
            return state;
    }
        
}