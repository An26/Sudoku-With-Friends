import sudoku from 'sudoku';
import React from 'react';

function printboard(board) {
	var out = '';

	for (var row = 0; row < 9; row++) {
		for (var col = 0; col < 9; col++) {
			out += [""," "," ","  "," "," ","  "," "," "][col];
      		out += printcode(board[sudoku.posfor(row, col)]);
		}
		out += ['\n','\n','\n\n','\n','\n','\n\n','\n','\n','\n'][row];
	}

	return out;
}

function printcode(n) {
	if (n == null) {
		return '_';
	}

	return n + 1 + '';
}

var puzzle     = sudoku.makepuzzle();
var solution   = sudoku.solvepuzzle(puzzle);
var difficulty = sudoku.ratepuzzle(puzzle, 4);
var data       = {puzzle:puzzle, solution:solution};

//console.log('DATA:');
//console.log(JSON.stringify(data));
//console.log('PUZZLE:');
//console.log(printboard(puzzle));
//console.log('SOLUTION:');
//console.log(printboard(solution));
//console.log('RATING:', difficulty);


export default class Game extends React.Component {
	render (){
		return (
			<div>
				<table>
				<tbody>
					<tr>
					    <td> {printboard(puzzle)[0]} </td>
					    <td> {printboard(puzzle)[2]} </td>
					    <td> {printboard(puzzle)[4]} </td>
					    <td> {printboard(puzzle)[7]} </td>
					    <td> {printboard(puzzle)[9]} </td>
					    <td> {printboard(puzzle)[11]} </td>
					    <td> {printboard(puzzle)[14]} </td>
					    <td> {printboard(puzzle)[16]} </td>
					    <td> {printboard(puzzle)[18]} </td>
					  </tr>
					<tr>
					    <td> {printboard(puzzle)[20]} </td>
					    <td> {printboard(puzzle)[22]} </td>
					    <td> {printboard(puzzle)[24]} </td>
					    <td> {printboard(puzzle)[27]} </td>
					    <td> {printboard(puzzle)[29]} </td>
					    <td> {printboard(puzzle)[31]} </td>
					    <td> {printboard(puzzle)[34]} </td>
					    <td> {printboard(puzzle)[36]} </td>
					    <td> {printboard(puzzle)[38]} </td>
					  </tr>
					  <tr>
					    <td> {printboard(puzzle)[40]} </td>
					    <td> {printboard(puzzle)[42]} </td>
					    <td> {printboard(puzzle)[44]} </td>
					    <td> {printboard(puzzle)[47]} </td>
					    <td> {printboard(puzzle)[49]} </td>
					    <td> {printboard(puzzle)[51]} </td>
					    <td> {printboard(puzzle)[54]} </td>
					    <td> {printboard(puzzle)[56]} </td>
					    <td> {printboard(puzzle)[58]} </td>
					  </tr>
					  <tr>
					    <td> {printboard(puzzle)[61]} </td>
					    <td> {printboard(puzzle)[63]} </td>
					    <td> {printboard(puzzle)[65]} </td>
					    <td> {printboard(puzzle)[68]} </td>
					    <td> {printboard(puzzle)[70]} </td>
					    <td> {printboard(puzzle)[72]} </td>
					    <td> {printboard(puzzle)[75]} </td>
					    <td> {printboard(puzzle)[77]} </td>
					    <td> {printboard(puzzle)[79]} </td>
					  </tr>
					  <tr>
					    <td> {printboard(puzzle)[81]} </td>
					    <td> {printboard(puzzle)[83]} </td>
					    <td> {printboard(puzzle)[85]} </td>
					    <td> {printboard(puzzle)[88]} </td>
					    <td> {printboard(puzzle)[90]} </td>
					    <td> {printboard(puzzle)[92]} </td>
					    <td> {printboard(puzzle)[95]} </td>
					    <td> {printboard(puzzle)[97]} </td>
					    <td> {printboard(puzzle)[99]} </td>
					  </tr>
					  <tr>
					    <td> {printboard(puzzle)[101]} </td>
					    <td> {printboard(puzzle)[103]} </td>
					    <td> {printboard(puzzle)[105]} </td>
					    <td> {printboard(puzzle)[108]} </td>
					    <td> {printboard(puzzle)[110]} </td>
					    <td> {printboard(puzzle)[112]} </td>
					    <td> {printboard(puzzle)[115]} </td>
					    <td> {printboard(puzzle)[117]} </td>
					    <td> {printboard(puzzle)[119]} </td>
					  </tr>
					  <tr>
					    <td> {printboard(puzzle)[122]} </td>
					    <td> {printboard(puzzle)[124]} </td>
					    <td> {printboard(puzzle)[126]} </td>
					    <td> {printboard(puzzle)[129]} </td>
					    <td> {printboard(puzzle)[131]} </td>
					    <td> {printboard(puzzle)[133]} </td>
					    <td> {printboard(puzzle)[136]} </td>
					    <td> {printboard(puzzle)[138]} </td>
					    <td> {printboard(puzzle)[140]} </td>
					  </tr>
					  <tr>
					    <td> {printboard(puzzle)[142]} </td>
					    <td> {printboard(puzzle)[144]} </td>
					    <td> {printboard(puzzle)[146]} </td>
					    <td> {printboard(puzzle)[149]} </td>
					    <td> {printboard(puzzle)[151]} </td>
					    <td> {printboard(puzzle)[153]} </td>
					    <td> {printboard(puzzle)[156]} </td>
					    <td> {printboard(puzzle)[158]} </td>
					    <td> {printboard(puzzle)[160]} </td>
					  </tr>
					 <tr>
					    <td> {printboard(puzzle)[162]} </td>
					    <td> {printboard(puzzle)[164]} </td>
					    <td> {printboard(puzzle)[166]} </td>
					    <td> {printboard(puzzle)[169]} </td>
					    <td> {printboard(puzzle)[171]} </td>
					    <td> {printboard(puzzle)[173]} </td>
					    <td> {printboard(puzzle)[176]} </td>
					    <td> {printboard(puzzle)[178]} </td>
					    <td> {printboard(puzzle)[180]} </td>
					  </tr>
				</tbody>
				</table>
			</div>
		)
	}
}

