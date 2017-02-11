
import sudoku from 'sudoku';

var puzzle = sudoku.makepuzzle();
var solution = sudoku.solvepuzzle(puzzle);
console.log('old puzzle', puzzle);
var printcode = function(n) {
        if (n == null) {
            return '';
        }
        return n + 1 + '';
    }

module.exports = {
    printboard: function(board) {
        var out = [];

        for (var row = 0; row < 9; row++) {
            for (var col = 0; col < 9; col++) {
                out.push(printcode(board[sudoku.posfor(row, col)]));
            }
        }
        return out;
    },
    newBoard: function() {
    this.puzzle = sudoku.makepuzzle();
    console.log( 'puzzle', this.puzzle);
        this.solution = sudoku.solvepuzzle(this.puzzle);
        this.data = {
            puzzle: this.puzzle,
            solution: this.solution
        };
        return this.puzzle;
    },

    printcode: printcode,
    puzzle     : puzzle,
    solution   : solution,
    difficulty : sudoku.ratepuzzle(puzzle, 4),
    data       : {puzzle:puzzle, solution:solution},
    copyBoard  : []
    
}
