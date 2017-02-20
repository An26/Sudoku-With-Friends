// play game file is only for multiplayer game

import React from 'react';
import  Chat  from './../Features/Chat';
import TimeInterval from './../Features/TimeCount';
import GameLogic from './../Features/GameLogic';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import { gameRunning, gameStop } from '../../actions/timeCountActions';
import { setMultiplayerGame } from '../../actions/gameLogicActions';
// import { opponentBoard } from '../../actions/gameLogicActions.js';
import GameInputBtn from './../Features/GameInputBtn';
import { roomDetails } from '../../actions/multiplayerGameActions';
import axios from 'axios';
// import gameGen from '../Js/gameGenerator';

@connect((store) => {
	return {
		gameRunning: store.timeCount.gameRunning,
		// roomDetails: store.multiplayer.roomDetails,
		opponentBoard: store.gameLogic.opponentBoard,
		playerBoard: store.gameLogic.playerBoard,
	 	solution: store.gameLogic.solution,
		opponent: store.gameLogic.opponent
	}
})

export default class PlayGame extends React.Component {
		constructor(context, props){
			super(context, props);
		}

// when play game page gets mounted on the page then we make an ajax call to know how many people are there 
// in the room
	componentDidMount() {
		var self = this;
		// setInterval(function() { 
			axios.get('/api/game/' + this.props.params.id)
			.then(function(response) {
				self.props.dispatch(roomDetails({'id': self.props.params.id, 'roomLength': response.data.players.length}))			
				self.props.dispatch(setMultiplayerGame(response.data));
			})
		// }.bind(this), 1000);
		

	}
	// componentDidUpdate(){
	// 	// console.log(this.props.roomDetails)
	// 	console.log(this.props.opponentBoard)
	// 	console.log(this.props.playerBoard)
	// 	console.log(this.props.solution)
	// 	// console.log(this.props.opponent)
	// }


// its a delete route if user exits the room and if the room has less than 2 players`
	componentWillUnmount() {
		let self = this;
		
		if(confirm('Do you wish to leave the room')) {
			axios.delete('/api/game/'+ this.props.params.id + '/delete', {player: cookie.load('username')})
			.then((response) => {
				if(response) {
					// console.log('delres', response);
					// self.props.dispatch(setMultiplayerGame(response.data));
					self.props.dispatch(roomDetails({'id': self.props.params.id, 'roomLength': response.data.players.length}))			
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
				<div className="col-md-8 col-sm-12 activeGame" style={divStyle}>
					<TimeInterval />
						{this.props.gameRunning ?
							<div>
								<GameInputBtn />
								<GameLogic opponentBoard={this.props.opponentBoard} 
								playerBoard={this.props.playerBoard} 
								solution={this.props.solution} />
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


