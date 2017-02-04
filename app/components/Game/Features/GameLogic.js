import React from 'react';
import { connect } from 'react-redux';
import { initialPuzzle, selectedCell } from '../../actions/gameLogicActions.js';
import gameGen from '../Js/gameGenerator';

@connect((store) => {
console.log(store);
   return {
     initialPuzzle: store.gameLogic.initialPuzzle,
	 solution: store.gameLogic.solution,
     selectedCell: store.gameLogic.selectedCell,
	 wrongGuesses: store.gameLogic.wrongGuesses,
	 gameRunning: store.timeCount.gameRunning
   };
})

export default class GameLogic extends React.Component {
       constructor(props, context) {
		super(props, context);
        this.getCellColor = this.getCellColor.bind(this);
    }

    componentDidUpdate() {
		if(this.props.initialPuzzle.indexOf("")===-1) {
			if(this.checkResult()) {
				window.alert("You won!");
			} else {
				// window.alert("Check again...");
			}
		}
	}

	shouldComponentUpdate(nextProps) {
		if( this.props.selectedCell !== nextProps.selectedCell) {
			return false;
		}
		return true;
	}

    handleClick(event) {
	    this.props.dispatch(selectedCell(event.target.id));	
	}

	isGuessRight(cell) {
		return this.props.initialPuzzle[cell] === this.props.solution[cell];
	}

    getCellColor(i) {
		if( this.props.initialPuzzle[i] === "" || this.props.initialPuzzle[i] === null ) {
			return "grey";
		}
		else if( this.props.gameRunning ) {
			if(this.isGuessRight(i)) {
				return 'yellow';
			} else {
				return 'red';
			}
		} 
	}

    generateCells(rowNumber) {
    	var rows = [];
    	for (var i = rowNumber*9; i < rowNumber*9+9; i++) {
    		if(gameGen.printboard(gameGen.puzzle)[i]==="" || gameGen.puzzle[i] === null) {
    			rows.push(
					<td key={i}>
					<input id={i}
						onClick = {this.handleClick.bind(this)}
						value={this.props.initialPuzzle[i] || ""} 
						style={{background: this.getCellColor(i)}}
						placeholder="_" 
						className="cell"
						type="integer" 
						maxLength="1" 
						min="1" 
						max="9"/>
					</td>)
    		} else {
    		rows.push(<td key={i} id={i}>{this.props.initialPuzzle[i]}</td>)
    		}
    	}
    	return rows;
    }

	generateGame() {
    	var board=[];
    	for (var i = 0; i < 9; i++) {
    		board.push(<tr key={i}>
    			{this.generateCells(i)}
    		</tr>);
    		gameGen.copyBoard.push(<tr key={i}>
    			{this.generateCells(i)}
    		</tr>);
    	}
    	return board;
    }

    checkResult() {
    	for (var i = 0; i < this.props.initialPuzzle.length; i++) {
				if(this.props.initialPuzzle[i]!= this.props.solution[i]) {
						return false;
				}
    	}
    	return true;
	}

    render() {
        return (
            <div>
                {this.generateGame()}
				Wrong Guesses : {this.props.wrongGuesses}
            </div>
        )
    }
}