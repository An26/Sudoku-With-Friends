// play game file is only for multiplayer game

import React from 'react';
import  Chat  from './../Features/Chat';
import TimeInterval from './../Features/TimeCount';
import GameLogic from './../Features/GameLogic';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import { gameRunning, gameStop } from '../../actions/timeCountActions';
import { setMultiplayerGame } from '../../actions/gameLogicActions';
import GameInputBtn from './../Features/GameInputBtn';
import { roomDetails } from '../../actions/multiplayerGameActions';
import axios from 'axios';
var numberOfPlayers;

@connect((store) => {
	return {
		gameRunning: store.timeCount.gameRunning,
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
		this.updateRoom();
		numberOfPlayers = setInterval(this.updateRoom.bind(this), 3000);
		this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this))
	}

	updateRoom() {
		var self = this;
		axios.get('/api/game/' + this.props.params.id)
			.then(function(response) {
				self.props.dispatch(setMultiplayerGame(response.data));
<<<<<<< HEAD
=======
				self.props.dispatch(roomDetails({'id': self.props.params.id, 'roomLength': response.data.players.length}))			
				if(response.data.players.length === 2) {
					clearInterval(numberOfPlayers);
				}

				return;
			}).catch(function(err) {
				console.log(err);
>>>>>>> ea85bdad18c70aae93060b3e0d2da63be0b9b2c6
			})
	}

// its a delete route if user exits the room and if the room has less than 2 players`
	routerWillLeave() {
		let self = this;
		
		if(confirm('Do you wish to leave the room')) {
			axios.delete('/api/game/'+ this.props.params.id + '/delete', {playerId: cookie.load('userId')})
			.then((response) => {
				if(response) {
					self.props.dispatch(roomDetails({'id': self.props.params.id, 'roomLength': response.data.players.length}))			
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


