import gameGen from '../Game/Js/gameGenerator';
import cookie from 'react-cookie';

export default function reducer(state={
    playerBoard: gameGen.printboard(gameGen.puzzle),
    opponentBoard: [],
    solution: gameGen.printboard(gameGen.solution),
    selectedCell:'',
    wrongGuesses: 0,
    opponent: ''
}, action) {
    switch(action.type) {
        case 'OPPONENT_BOARD':
            return {...state, opponentBoard: action.payload}
        case 'SELECTED_CELL':
            return {...state, selectedCell: action.payload}
        case 'UPDATE_BOARD':
            let cell = action.payload.cell;
            let newPuzzle = state.playerBoard.slice(0);
            let wrongGuesses = state.wrongGuesses;
            newPuzzle[cell] = action.payload.value;
            if( newPuzzle[cell] !== state.solution[cell] ) {
                wrongGuesses = wrongGuesses+ 1;
            }
            let newState = Object.assign({}, state, {
                playerBoard: newPuzzle,
                wrongGuesses: wrongGuesses
            });
            return newState;
        case 'NEW_PUZZLE':
            return {...state, 
                playerBoard: gameGen.printboard(gameGen.newBoard()), 
                solution:gameGen.printboard(gameGen.solution),
                wrongGuesses: 0
            }
        case 'SET_MULTIPLAYER_GAME':
            var playerId = cookie.load('userId').toLowerCase();
            var player, opponent;
            // since we are checkint by player name and player name can be same, has to do it this way
            if(action.payload.players[0].playerId === playerId) {
                player = action.payload.players[0]
                opponent = action.payload.players[1]
            } else {
                player =  action.payload.players[1]
                opponent = action.payload.players[0]
            }
            return {...state, 
                playerBoard: player.gameBoard,
                opponentBoard: opponent ? opponent.gameBoard : [],
                opponent: opponent,
                solution: action.payload.solution,
            }
        default:
            return state;
    }
}