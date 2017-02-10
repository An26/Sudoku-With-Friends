import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createRoom, roomName, goToRoom } from '../../actions/multiplayerGameActions';
import cookie from 'react-cookie';

import axios from 'axios';

@connect((store)=> {
	return {
		createRoom: store.multiplayer.createRoom,
		newRoomId: store.multiplayer.newRoomId,
		initialPuzzle: store.gameLogic.initialPuzzle,
	 	solution: store.gameLogic.solution,
		gameRunning: store.timeCount.gameRunning,
		logIn: store.logInStatus.loggedIn
	}
})
export default class GameLobby extends React.Component {
	constructor(props,context) {
		super(props, context);
	}

	handleClick(event) {
		event.preventDefault();
		this.props.dispatch(createRoom());
	}

	// getRoomList() {
	// 	console.log('this is a room list')
	// 	// with this room get all the rooms list and attach a join button on click on which reroute to playgame
	// 	// app.get('/api/game', games.list);
	// 	browserHistory.push('/playGame');
	// }

	
	postGameDetails() {	
				// console.log(this.props.gameRunning);
			// console.log(this.props.logIn);
	
			console.log('1',this.props.logIn);
			console.log('2',this.props.newRoomId);
			console.log('3',this.props.initialPuzzle);
			console.log('4',this.props.solution);
			console.log('5',cookie.load('username'))
		if(this.props.logIn) {
			
			axios.post('api/game', 
			{
				roomId: this.props.newRoomId, 
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
		// axios.post('/api/game', {id: this.props.newRoomId}, function(err, res) {
		// 	console.log(res);
		// })
		this.postGameDetails();
		browserHistory.push('/playGame');
		
		// getGameDetails();
	}	


	// getGameDetails() {
	// 		console.log('init', this.props.initialPuzzle);
	// 	console.log('sol', this.props.solution);
	// }

	componentDidUpdate() {
		console.log('iid', this.props.newRoomId)
   		// console.log('iid', this.props.newRoomId)
		//    axios.post roomid
		// app.get('/api/game/:id', games.get);
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
					<div>
						{/*{this.getRoomList()}*/}
						<h4>Here we will have all room names listed</h4>
					</div>
				</div>
				}
			</div>
		)
	}
}
