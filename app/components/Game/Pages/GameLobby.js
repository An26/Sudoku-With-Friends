import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createRoom, roomName, gameRoomData } from '../../actions/multiplayerGameActions';
import cookie from 'react-cookie';
import axios from 'axios';

@connect((store)=> {
	return {
		createRoom: store.multiplayer.createRoom,
		newRoomName: store.multiplayer.roomName,
		initialPuzzle: store.gameLogic.initialPuzzle,
	 	solution: store.gameLogic.solution,
		gameRunning: store.timeCount.gameRunning,
		logIn: store.logInStatus.loggedIn,
		gameRoomData: store.multiplayer.gameRoomData
	}
})
export default class GameLobby extends React.Component {
	constructor(props,context) {
		super(props, context);
}

	handleClick(event) {
		event.preventDefault();
		this.props.dispatch(createRoom());
		this.userData();
	}

	userData() {
		let self = this;
		let roomData = []
		axios.get('/api/game').then(function(res) {
			self.props.dispatch(gameRoomData(res.data))
		})
	}
	

	postGameDetails() {	
		if(this.props.logIn) {		
			axios.post('api/game', 
			{
				roomName: this.props.newRoomName, 
				initialBoard: this.props.initialPuzzle,
				solution: this.props.solution,
				username : cookie.load('username')				
			}).then((err, res)=> {
				if(err) throw err;
				console.log(res);			
			})
		}
	}

		
	getRoomName(event) {
		event.preventDefault();
		let room = document.getElementById('roomName').value;
		this.props.dispatch(roomName(room))
		this.postGameDetails();
		browserHistory.push('/playGame');
	}	

	render (){
		return (
			<div>
				<p>This is the Lobby where game rooms are created so people can play with their friends
				</p>
				{!this.props.createRoom ?
				<button onClick={this.handleClick.bind(this)}>Creat Game/Join</button>
				:
				<div>
					<form onSubmit={this.getRoomName.bind(this)} >
						<input id="roomName" type="text" placeholder="enter your room name" />
						<button>Create Room</button>
					</form>
				</div>
				}
				<div>	
					{this.props.gameRoomData.map((ele, i)=>{
						return (
						<div key={i}>
							<p>id: {ele.id}</p>
							<p>players: {ele.players}</p>
							{ ele.players === 2 ?
							null
							:
							<button>Join</button>
							}
						</div>
						)
					})}		
				</div>
				
			</div>
		)
	}
}
