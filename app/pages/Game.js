import sudoku from 'sudoku';
import React from 'react';
import { gameRunning, timeRemaining } from '../actions/gameStatusActions';
import { connect } from 'react-redux';
import  Chat  from '../Chat/Chat';

function printboard(board) {
	var out = [];

	for (var row = 0; row < 9; row++) {
		for (var col = 0; col < 9; col++) {
      		out.push(printcode(board[sudoku.posfor(row, col)]));
		}
	}

	return out;
}

function printcode(n) {
	if (n == null) {
		return '';
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
console.log('SOLUTION:');
console.log(printboard(solution));
//console.log('RATING:', difficulty);


	// import connect
@connect((store) => {
   return {
     gameRunning: store.gameStatus.gameRunning,
	 timeRemaining: store.gameStatus.counter
   }; 
})

export default class Game extends React.Component {
	constructor(props, context) {
		super(props, context);
		// console.log('props', props);
		this.state = {
			puzzle: printboard(puzzle),
			solution: printboard(solution)
		}
	}


	clickHandler(event) {
		let counter = 5
		event.preventDefault();
		const interval = setInterval(function() {
			if(counter > 0) {
				counter--
				console.log(counter);
				this.props.dispatch(gameRunning(true));
				this.props.dispatch(timeRemaining(counter));
				// console.log( this.props.gameRunning );
			} else {
				this.props.dispatch(gameRunning(false));
				clearInterval(interval);
				// console.log( this.props.gameRunning );
			  }
		}.bind(this), 1000);
		return;
	}

	handleInput(event) {
        let newValue = event.target.value;
	    let cellIndex = event.target.id;
        let copy = this.state.puzzle;
        copy[cellIndex] = newValue;
        this.setState({puzzle: copy});
    }

    generateCells(rowNumber) {
    	var rows = [];
    	for (var i = rowNumber*9; i < rowNumber*9+9; i++) {
    		if(printboard(puzzle)[i]==="") {
    			rows.push(<td key={i}><input id={i} onChange={this.handleInput.bind(this)} value={this.state.puzzle[i]} placeholder="_" className="cell" type="integer" maxLength="1" min="1" max="9"/></td>)
    		} else {
    		rows.push(<td key={i} id={i}>{this.state.puzzle[i]}</td>)
    		}
    	}
    	return rows;
    }

    generateGame() {
    	var board=[];
    	for (var i = 0; i < 9; i++) {
    		board.push(<tr key={i}>
    			{this.generateCells(i)}
    		</tr>)
    	}
    	return board;
    }

    checkResult() {
    	for (var i = 0; i < this.state.puzzle.length; i++) {
				if(this.state.puzzle[i]!= this.state.solution[i]) {
						return false;
				} 
    	}
    	return true;
	}

	render (){
		return (
		<div>
				<div className = "main-content">
						{!this.props.gameRunning ?
							<div>
								<button id="startGame" onClick={this.clickHandler.bind(this)}>Start</button>
							</div>
							:
							<div>Time Remaining: {this.props.timeRemaining}</div>
						}
						<div>
							<Chat />
						</div>				
					</div>
				<div>
				<table>
				<tbody>
					{this.generateGame()}
				</tbody>
				</table>
			</div>
		</div>
		)
	}

	componentDidUpdate() {
		if(this.state.puzzle.indexOf("")===-1) {
			if(this.checkResult()) {
				window.alert("You won!");
			} else {
				window.alert("Check again...");
			}
		}
	}


}

