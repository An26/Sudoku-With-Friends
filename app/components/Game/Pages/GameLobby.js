import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createRoom, joinRoom } from '../../actions/multiplayerGameActions';
import cookie from 'react-cookie';
import axios from 'axios';

@connect((store)=> {
	return {
		createRoom: store.multiplayer.createRoom,
		initialPuzzle: store.gameLogic.initialPuzzle,
	 	solution: store.gameLogic.solution,
		gameRunning: store.timeCount.gameRunning,
		logIn: store.logInStatus.loggedIn,
		joinRoom: store.multiplayer.joinRoom
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
			// console.log(res);
			self.props.dispatch(joinRoom(res.data))
		})
	}

	postGameDetails(room) {	
		if(this.props.logIn) {		
			axios.post('/api/game', 
			{
				roomName: room, 
				initialBoard: this.props.initialPuzzle,
				solution: this.props.solution,
				username : cookie.load('username')				
			}).then((err, res)=> {
				if(err) throw err;
				// console.log(res);			
			})
		}
	}

		
	getRoomName(event) {
		event.preventDefault();
		let room = document.getElementById('roomName').value;
		// create room text box validation
		if(room === "") {
			return "this s a required field";
		} 
		this.postGameDetails(room);
		browserHistory.push('/playGame');
	}	

	joinGameRoom() {
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
						<input id="roomName" type="text" placeholder="enter your room name" required/>
						<button>Create Room</button>
					</form>
				</div>
				}
				<div>	
					{this.props.joinRoom.map((ele, i)=>{
						return (
						<div key={i}>
							{/*<p>Roomid: {ele.id}</p>*/}
							<p>Room Name: {ele.roomName}</p>
							<p>players: {ele.players}</p>
							{ ele.players === 2 ?
							null
							:
							<button onClick={this.joinGameRoom.bind(this)} className="joinRoom" id={ele.id}>Join</button>
							}
						</div>
						)
					})}		
				</div>
				
			</div>
		)
	}
}
