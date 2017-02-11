
import sudoku from 'sudoku';

var puzzle = sudoku.makepuzzle();
var solution = sudoku.solvepuzzle(puzzle);
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
    //     var newPuzz = []
    //     var puzzle = sudoku.makepuzzle();
    //     for(var i=0; i<puzzle.length; i++) {
    //         if(puzzle[i] === 0) {
    //             newPuzz.push(9);
    //             // console.log(puzzle);
    //         } else {
    //             newPuzz.push(puzzle[i])
    //         }
    //     }
        
    //     this.puzzle = newPuzz;
    //     // this.puzzle = sudoku.makepuzzle();
    //     var newSol = []
    //     var solution = sudoku.solvepuzzle(this.puzzle);
    //     for(var i=0; i<solution.length; i++) {
    //         if(solution[i] === 0) {
    //             newSol.push(9);
    //             // console.log(puzzle);
    //         }
    //         else {
    //             newSol.push(solution[i]);
    //         }
    //     }

    //     this.solution = newSol;
    //     // this.solution = sudoku.solvepuzzle(this.puzzle);
    //     this.data = {
    //         puzzle: this.puzzle,
    //         solution: this.solution
    //     };
    //     return this.puzzle;
    // },

    // printcode: printcode,
    // puzzle     : puzzle,
    // solution   : solution,
    // difficulty : sudoku.ratepuzzle(puzzle, 4),
    // data       : {puzzle:puzzle, solution:solution},
    // copyBoard  : []



    this.puzzle = sudoku.makepuzzle();
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
