import gameGen from '../Game/Js/gameGenerator';

export default function reducer(state={
    playerBoard: gameGen.printboard(gameGen.puzzle),
    opponentBoard: [],
    solution: gameGen.printboard(gameGen.solution),
    selectedCell:'',
    wrongGuesses: 0
}, action) {
    switch(action.type) {
        case 'PLAYER_BOARD':
            // let cell = action.payload.cell;
            // let newPuzzle = state.playerBoard.slice(0);
            // let wrongGuesses = state.wrongGuesses;
            // newPuzzle[cell] = action.payload.value;
            // if( newPuzzle[cell] !== state.solution[cell] ) {
            //     wrongGuesses = wrongGuesses+ 1;
            // }
            // let newState = Object.assign({}, state, {
            //     playerBoard: newPuzzle,
            //     wrongGuesses: wrongGuesses
            // });
            // console.log('playerboard', action.payload);
            // console.log('newState', newState);
            // return newState;
            return {...state, playerBoard: action.payload}
        case 'OPPONENT_BOARD':
            console.log('opponentBoard', action.payload);
            return {...state, opponentBoard: action.payload}
        case 'SELECTED_CELL':
            return {...state, selectedCell: action.payload}
        case 'UPDATE_BOARD':
            let cell = action.payload.cell;
            let newPuzzle = state.playerBoard.slice(0);
            let wrongGuesses = state.wrongGuesses;
            newPuzzle[cell] = action.payload.value;
            // console.log(newPuzzle[cell])
            if( newPuzzle[cell] !== state.solution[cell] ) {
                wrongGuesses = wrongGuesses+ 1;
            }
            // console.log('oldstate', state.playerBoard)
            let newState = Object.assign({}, state, {
                playerBoard: newPuzzle,
                wrongGuesses: wrongGuesses
            });
            // console.log('newpuzzle', state.playerBoard)
            // console.log('newstate', newState)
            return newState;
        case 'NEW_PUZZLE':
            return {...state, 
                playerBoard: gameGen.printboard(gameGen.newBoard()), 
                solution:gameGen.printboard(gameGen.solution),
                wrongGuesses: 0
            }
        default:
            return state;
    }
}