export function playerBoard(currentPuzzle) {
    return{
        type: 'PLAYER_BOARD',
        payload: currentPuzzle
    }
}

export function playerBoardUpdate(updateValue) {
    return{
        type: 'UPDATE_BOARD',
        payload: updateValue
    }
}

export function selectedCell(selectedCell) {
    return{
        type: 'SELECTED_CELL',
        payload: selectedCell
    }
}

export function newPuzzle(selectedCell) {
    return{
        type: 'NEW_PUZZLE'
    }
}

export function opponentBoard(puzzle) {
    return{
        type: 'OPPONENT_BOARD',
        payload: puzzle
    }
}
