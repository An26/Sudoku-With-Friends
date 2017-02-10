export default function reducer(state={
    createRoom: false,
    roomName: '',
    roomID : 0,
    newRoomId: ''
}, action) {
    switch(action.type) {
        case 'CREATE_ROOM':
            return {...state, createRoom: action.payload}
        case 'ROOM_NAME':
            let id = state.roomID+1;
            let newId = action.payload+id
            return{...state, roomName:action.payload, roomID:id, newRoomId:newId}
        default:
            return state;
    }
        
}