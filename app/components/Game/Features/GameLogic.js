import React from 'react';
import { connect } from 'react-redux';
import { playerBoard, selectedCell, playerBoardUpdate } from '../../actions/gameLogicActions.js';
import gameGen from '../Js/gameGenerator';
import cookie from 'react-cookie';
import axios from 'axios';

@connect((store) => {
   return {
     playerBoard: store.gameLogic.playerBoard,
	 solution: store.gameLogic.solution,
     selectedCell: store.gameLogic.selectedCell,
	 wrongGuesses: store.gameLogic.wrongGuesses,
	 gameRunning: store.timeCount.gameRunning,
	 roomId: store.multiplayer.roomDetails,
	 joinRoomId: store.multiplayer.joinRoomId,
	 playersGameBoard: store.multiplayer.playersGameBoard,
	 playerBoardUpdate: store.gameLogic.playerBoardUpdate,
   };
})

export default class GameLogic extends React.Component {
       constructor(props, context) {
		super(props, context);
        this.getCellColor = this.getCellColor.bind(this);
    }

	componentDidMount() {
		this.getBoard();
		// console.log('player', this.props.playerBoard); 
	}

	getBoard(){
		let userName = cookie.load('username').toLowerCase();
		this.props.playersGameBoard.forEach((ele)=>{
			 if(ele.playerName === userName) {
				this.props.dispatch(playerBoard(ele.gameBoard))
			}
		})
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
		// console.log('i m right');
		// console.log('check', this.props.playerBoard[cell] === this.props.solution[cell]	)
		let currentRoomId = this.props.roomId || this.props.joinRoomId
		if(this.props.playerBoard[cell] === this.props.solution[cell]) {
			console.log('value',this.props.playerBoard[cell]);
			axios.put('/api/game/'+ currentRoomId +'/update', 
			{
				'player': cookie.load('username'), 
				'gameBoard': cell,
				 'value': this.props.solution[cell]
			});
			return true;
		} else {
			return false;
		}
	
		// return this.props.playerBoard[cell] === this.props.solution[cell]
	}

    getCellColor(i) {
		if( this.props.playerBoard[i] === "" || this.props.playerBoard[i] === null ) {
			return "gray";
		}
		else if( this.props.gameRunning ) {
			if(this.isGuessRight(i)) {
				console.log('true', i);
				return '#D6EB99';
			} else {
				return 'white';
			}
		} 
	}

    generateCells(rowNumber) {	
    	var rows = [];
    	for (var i = rowNumber*9; i < rowNumber*9+9; i++) {
    		if(this.props.playerBoard[i]==="" || this.props.playerBoard === null) {
    			rows.push(
					<td key={i}>
					<input id={i}
						onClick = {this.handleClick.bind(this)}
						value={this.props.playerBoard[i] || ""} 
						style={{background: this.getCellColor(i)}}
						className="cell"
						type="integer" 
						maxLength="1" 
						min="1" 
						max="9"/>
					</td>)
    		} else {
    		rows.push(<td key={i} id={i}>{this.props.playerBoard[i]}</td>)
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
    	for (var i = 0; i < this.props.playerBoard.length; i++) {
				if(this.props.playerBoard[i]!= this.props.solution[i]) {
						return false;
				}
    	}
    	return true;
	}

    render() {
        return (	
			<div>
				{this.props.gameRunning ? 
				<span>
				Wrong Guesses : {this.props.wrongGuesses}
				<table>
            		<tbody className="mainGame">
					{this.generateGame()}
            	</tbody>
				</table>
				</span>
				:
				null
				}
			</div>
        )
    }
}