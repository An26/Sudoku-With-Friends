import sudoku from 'sudoku';
import React from 'react';
import ReactDOM from 'react-dom';
import { gameRunning, timeRemaining } from '../actions/gameStatusActions';
import { connect } from 'react-redux';
import  Chat  from '../Chat/Chat';

// styling
	var buttonStyle = {
		margin: "5px",
		height: "30px",
		width: "30px",
		background: "purple",
		color: "white"	

	}

	var buttonSpanStyle = {
		marginLeft: "10px"
	}

// end of styling


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
console.log('difficulty', difficulty);
var data       = {puzzle:puzzle, solution:solution};

//console.log('DATA:');
//console.log(JSON.stringify(data));
//console.log('PUZZLE:');
//console.log(printboard(puzzle));
// console.log('SOLUTION:');
// console.log(printboard(solution));
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
			solution: printboard(solution),
			selectedCell: '',
			wrongGuesses: 0
			// buttonIsActive: false
		}

		this.getCellColor = this.getCellColor.bind(this);
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

	handleClick(event) {
		// this.state.buttonIsActive = true;
		this.setState({selectedCell: event.target.id});		
	}

	handleInputBtn(event) {
		let newValue = event.target.value;
		let copy = this.state.puzzle;
		copy[this.state.selectedCell] = newValue;
		this.setState({puzzle: copy});
		this.state.wrongGuesses += 1;
		// console.log('state', this.state.numberOfGuesses)
		// this.redBoxForWrongAns();
		return;
	}

	// redBoxForWrongAns() {
	// 	debugger;
	// 		// console.log(this.state.solution)
	// 	if(this.state.puzzle[this.state.selectedCell] === this.state.solution[this.state.selectedCell]) {
	// 		console.log('true')
	// 		return;
	// 	}
	// 	this.state.wrongGuesses += 1;
	// 	console.log('state', this.state.wrongGuesses)
	// 	console.log('refs', this.refs.input);
	// 	console.log('wrong ans');
	// 	ReactDOM.findDOMNode()
	// 	return false;
	// }

	getCellColor(i) {
		// debugger;
		if (this.state.puzzle[i] === this.state.solution[i]) {
			return 'green';
		} else {
			return 'red';
		}
	}

    generateCells(rowNumber) {
    	var rows = [];
    	for (var i = rowNumber*9; i < rowNumber*9+9; i++) {
    		if(printboard(puzzle)[i]==="") {
    			rows.push(
					<td key={i}>
					<input id={i}
						onClick = {this.handleClick.bind(this)}
						value={this.state.puzzle[i]} 
						style={{ backgroundColor: this.getCellColor(i) }}
						placeholder="_" 
						className="cell"
						type="integer" 
						maxLength="1" 
						min="1" 
						max="9"/>
					</td>)
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


	createNumButtons() {
		var html = [];
		for(var i=1; i<10; i++) {
			html.push(
				<span style={buttonSpanStyle} key={i}>
				<button className="inputButton" 
					value={i} 
					onClick={this.handleInputBtn.bind(this)} 
					style={buttonStyle}>
					{i}
				</button>
				</span>);
		}
		return html;
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
							<div>Wrong Guesses: {this.state.wrongGuesses}</div>
							<Chat />
						</div>
					</div>
				<div>
				<table>
				<tbody>
					{this.generateGame()}
				</tbody>
				</table>
				<div>
				{this.createNumButtons()}
				</div>
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

