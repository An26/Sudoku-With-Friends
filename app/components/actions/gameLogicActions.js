export function initialPuzzle(currentPuzzle) {
    console.log('currentpuzzle', currentPuzzle);
    return{
        type: 'PUZZLE',
        payload: currentPuzzle
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