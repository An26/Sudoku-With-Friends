import gameGen from '../Game/Js/gameGenerator';

export default function reducer(state={
    initialPuzzle: gameGen.printboard(gameGen.puzzle),
    solution: gameGen.printboard(gameGen.solution),
    selectedCell:'',
    wrongGuesses: 0
}, action) {
    switch(action.type) {
        case 'PUZZLE':
            let cell = action.payload.cell;
            let newPuzzle = state.initialPuzzle.slice(0);
            let wrongGuesses = state.wrongGuesses;
            newPuzzle[cell] = action.payload.value;
            if( newPuzzle[cell] !== state.solution[cell] ) {
                wrongGuesses = wrongGuesses+ 1;
            }
            console.log('guesses',wrongGuesses);
            return Object.assign({}, state, {
                initialPuzzle: newPuzzle,
                wrongGuesses: wrongGuesses
            });
        case 'SELECTED_CELL':
            return {...state, selectedCell: action.payload}
        case 'NEW_PUZZLE':
            return {...state, 
                initialPuzzle: gameGen.newBoard(), 
                solution:gameGen.solution,
                wrongGuesses: 0
            }
        default:
            return state;
    }
}