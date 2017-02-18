import React from 'react';
import  Chat  from './../Features/Chat';
import TimeInterval from './../Features/TimeCount';
import GameLogic from './../Features/GameLogic';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import { gameRunning, gameStop } from '../../actions/timeCountActions';
import { playersGameBoard } from '../../actions/gameLogicActions';
import { opponentBoard } from '../../actions/gameLogicActions.js';
import GameInputBtn from './../Features/GameInputBtn';
import { roomDetails } from '../../actions/multiplayerGameActions';
import axios from 'axios';
// import gameGen from '../Js/gameGenerator';

@connect((store) => {
	return {
		gameRunning: store.timeCount.gameRunning,
		playersGameBoard: store.multiplayer.playersGameBoard,
		roomDetails: store.multiplayer.roomDetails,
		opponentBoard: store.gameLogic.opponentBoard,
	}
})

export default class PlayGame extends React.Component {
		constructor(context, props){
			super(context, props);
		}

// when play game page gets mounted on the page then we make an ajax call to know how many people are there 
// in the room
	componentDidMount() {
		console.log('i am in')
		var self = this;
		axios.get('/api/game/' + this.props.params.id)
		.then(function(response) {
			self.props.dispatch(roomDetails({'id': self.props.params.id, 'roomLength': response.data.players.length}))			
			self.setPlayerBoard(response);
		})
	}	

	setPlayerBoard(response) {
				const data = response.data
				this.props.dispatch(playersGameBoard(data));
				this.getBoard();
	}

	getBoard(){
		let userName = cookie.load('username').toLowerCase();
		this.props.playersGameBoard.forEach((ele)=>{
			 if(ele.playerName === userName) {
				this.props.dispatch(opponentBoard(ele.gameBoard))	 
			}
		})
	}


	 generateCells(rowNumber) {	
				var rows = [];
				for (var i = rowNumber*9; i < rowNumber*9+9; i++) {
					if(this.props.opponentBoard[i]==="" || this.props.opponentBoard[i] === null) {
						rows.push(
							<td key={i}>
							<input id={i}
								placeholder="_" 
								className="cell"
								type="integer" 
								maxLength="1" 
								min="1" 
								max="9"/>
							</td>)
					} else {
					rows.push(<td key={i} id={i}>{this.props.opponentBoard[i]}</td>)
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
    	}
    	return board;
    }

// its a delete route if user exits the room and if the room has less than 2 players`
	componentWillUnmount() {
		let self = this;
		
		if(confirm('Do you wish to leave the room')) {
			axios.delete('/api/game/'+ this.props.params.id + '/delete', {player: cookie.load('username')})
			.then((res) => {
				if(res) {
					self.props.dispatch(roomDetails({'id': self.props.params.id, 'roomLength': res.data.players.length}))			
					// console.log('details', this.props.roomDetails)
				}	
			}).catch((err) => {
				if(err) throw err;
			})
			return true;
		}
		// else continue
			return false;
	}

	render() {
		const divStyle = {
			padding: '10px',
			// border: '3px black solid',
			margin: '10px',
		}
		return(
			<div className="row">
				{/*{console.log('detaile', this.props.roomDetails)}*/}
				<div className="col-md-8 col-sm-12 activeGame" style={divStyle}>
					<TimeInterval />
						{this.props.gameRunning ?
							<div>
								<GameLogic />
								<GameInputBtn />
								{this.generateGame()}
							</div>
							:
							null
						}									
					<aside className="chatBox" style={divStyle}>
						<h3>Chat with Friends</h3>
						<Chat />
					</aside>
				</div>
			</div>	
		)
	}
};


/*
		<div className="mainContainer">
				<p>This is the place where users actually play sudoku with a friend</p>
				<div>game level/difficulty here??</div>
				
				<div className="row">
					<div className="col-md-8 col-sm-12 activeGame" style={divStyle}>
						<TimeInterval />
							{this.props.gameRunning ?
								<div>
									<GameLogic />
									<GameInputBtn />
									{this.getOpponentBoard()}
								</div>
							:
							null
							}
					</div>
					<div className="col-md-3 OpponentGame" style={divStyle}>
						{this.props.opponentsGameBoard}
						{this.generateGame()}
						<div className="opponentName">Opponent Name</div>
						<aside className="chatBox" style={divStyle}>
							<h3>Chat with Friends</h3>
							<Chat />
						</aside>

					</div>
				</div>
			</div>*/