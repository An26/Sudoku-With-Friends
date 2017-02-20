import React from 'react';
import { connect } from 'react-redux';
import { playerBoard, selectedCell } from '../../actions/gameLogicActions.js';
import gameGen from '../Js/gameGenerator';
import cookie from 'react-cookie';
import axios from 'axios';
var opponentBoard;

@connect((store) => {
   return {
    //  playerBoard: store.gameLogic.playerBoard,
	//  solution: store.gameLogic.solution,
     selectedCell: store.gameLogic.selectedCell,
	 wrongGuesses: store.gameLogic.wrongGuesses,
	 gameRunning: store.timeCount.gameRunning,
	 gameType: store.gameType.gameType,
	//  roomId: store.multiplayer.roomDetails,
	//  playersGameBoard: store.multiplayer.playersGameBoard,
	 joinRoomId: store.multiplayer.joinRoomId
   };
})

export default class GameLogic extends React.Component {
       constructor(props, context) {
		super(props, context);
        // this.getCellColor = this.getCellColor.bind(this);
        // this.getBoard();
    }


    componentDidUpdate() {
		if(this.props.playerBoard.indexOf("")===-1) {
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
		// console.log(this.props.playerBoard[this.props.selectedCell] === this.props.solution[cell])
		// console.log( this.props.playerBoard );
		// console.log('cell', cell, 'board',this.props.playerBoard[cell], 'solution', this.props.solution[cell] );
		return (this.props.playerBoard[cell] === this.props.solution[cell])
	}

    getCellColor(i) {
		if ( this.props.gameRunning ) {
			if( this.props.playerBoard[i] === "" || this.props.playerBoard[i] === null) {
				return "not-answered";
			}
			else if(this.isGuessRight(i)) {
				return 'correct-answer';
			} else {
				return "wrong-answer";
			}
		} 
	} 
	
    generateCells(board,rowNumber, disabled) {		
    	var rows = [];
    	for (var i = rowNumber*9; i < rowNumber*9+9; i++) {
			rows.push(
				<td key={i}>
				<input id={i}
					onClick = {disabled? null: this.handleClick.bind(this)}
					value={board[i] || ""} 
					className={disabled ? 'cell' :`cell  ${this.getCellColor(i)}`}
					type="integer" 
					maxLength="1" 
					min="1" 
					max="9"/>
				</td>)
    	}
    	return rows;
    }

    checkResult() {
    	for (var i = 0; i < this.props.playerBoard.length; i++) {
				if(this.props.playerBoard[i]!= this.props.solution[i]) {
						return false;
				}
    	}
    	return true;
	}

	generateBoardGame(board, disabled) {
		var generatedBoard=[];
    	for (var i = 0; i < 9; i++) {
    		generatedBoard.push(<tr key={i}>
    			{this.generateCells(board, i, disabled)}
    		</tr>);
    	}
    	return generatedBoard;
	}


    render() {
        return (
            <div className="mainGame">
				Wrong Guesses : {this.props.wrongGuesses}
				{this.props.gameType === "single" ? 
					this.generateBoardGame(this.props.playerBoard, false)
				:
					<div>
						{this.generateBoardGame(this.props.playerBoard, false)}
						<hr />
						<h4>opponent Board</h4>
						{this.generateBoardGame(this.props.opponentBoard, true)}
					</div>
				}	
            </div>
		
        )
    }
}