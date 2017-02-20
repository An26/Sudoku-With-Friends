import React from 'react';
import { connect } from 'react-redux';
import { playerBoard, selectedCell } from '../../actions/gameLogicActions.js';
import { stopTimeInterval, gameRunning } from '../../actions/timeCountActions';
import gameGen from '../Js/gameGenerator';
import cookie from 'react-cookie';
import axios from 'axios';
var opponentBoard;

@connect((store) => {
   return {
     selectedCell: store.gameLogic.selectedCell,
	 wrongGuesses: store.gameLogic.wrongGuesses,
	 gameRunning: store.timeCount.gameRunning,
	 gameType: store.gameType.gameType,
	 joinRoomId: store.multiplayer.joinRoomId
   };
})

export default class GameLogic extends React.Component {
       constructor(props, context) {
		super(props, context);
    }


    componentDidUpdate() {
		if(this.props.playerBoard.indexOf("")===-1 && this.isGuessRight(this.props.selectedCell, this.props.playerBoard)) {
			if(this.checkResult()) {
				console.log('game done')
				this.props.dispatch(gameRunning(false))
				this.props.dispatch(stopTimeInterval());
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

	isGuessRight(cell, board) {
		return (board[cell] === this.props.solution[cell])
	}

    getCellColor(cell, board) {
		if ( this.props.gameRunning ) {
			if( board[cell] === "" || board[cell] === null) {
				return "not-answered";
			}
			else if(this.isGuessRight(cell, board)) {
				return 'correct-answer';
			} else {
				return "wrong-answer";
			}
		} 
	} 
	
    generateCells(board,rowNumber, disabled, displayNumbers) {		
    	var rows = [];
    	for (var i = rowNumber*9; i < rowNumber*9+9; i++) {
			rows.push(
				<td key={i}>
				<input id={i}
					onClick = {disabled? null: this.handleClick.bind(this)}
					value={displayNumbers ? (board[i] || "") : "" } 
					className={disabled ? 'cell' :`cell  ${this.getCellColor(i, board)}`}
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

	generateBoardGame(board, disabled, displayNumbers) {
		var generatedBoard=[];
    	for (var i = 0; i < 9; i++) {
    		generatedBoard.push(<tr key={i}>
    			{this.generateCells(board, i, disabled, displayNumbers)}
    		</tr>);
    	}
    	return generatedBoard;
	}


    render() {
        return (
            <div className="mainGame">
				Wrong Guesses : {this.props.wrongGuesses}
				{this.props.gameType === "single" ? 
					this.generateBoardGame(this.props.playerBoard, false, true)
				:
					<div>
						{this.generateBoardGame(this.props.playerBoard, false, true)}
						<hr />
						<h4>opponent Board</h4>
						{this.generateBoardGame(this.props.opponentBoard, false, false)}
					</div>
				}	
            </div>	
		
        )
    }
}