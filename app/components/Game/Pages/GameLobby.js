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
		const cardStyle = {
			border: '3px solid black',
			width: '20rem',
			margin: '10px',
			display: 'inline-block',

		}

		return (
			<div>
				<h1>Game Lobby</h1>
					<div>Here is a list of open rooms to join!</div>
					{/*the button should ONLY create rooms, when you go to game lobby, all the open rooms are already provided...*/}
				{!this.props.createRoom ?
				<button className="btn btn-default" onClick={this.handleClick.bind(this)}>Create Game</button>
				:
				<div>
					<form onSubmit={this.getRoomName.bind(this)} >
						<input id="roomName" type="text" placeholder="enter your room name" required/>
						<button  className="btn btn-default">Create Room</button>
					</form>
				</div>
				}
				<div className="room">	
					{this.props.joinRoom.map((ele, i)=>{
						return (
						<div className="holdRooms">
							<div key={i}>
								{/*<p>Roomid: {ele.id}</p>*/}

								<div className="roomCard" style={cardStyle}>
									<div className="card-block">
										<h4 className="card-title"> {ele.roomName} Room</h4>
										<img className="card-img-top" src="./images/table.svg" alt="Card image cap" />
										<p className="card-text">{ele.players} player is waiting</p>
										{ ele.players === 2 ?
										null
										:
										<button onClick={this.joinGameRoom.bind(this)} className="joinRoom btn btn-default" id={ele.id}>Join</button>
										}

									</div>
								</div>	

								{/*<p>Room Name: {ele.roomName}</p>
								<p>players: {ele.players}</p>*/}

							</div> 
						</div>
						)
					})}		
				</div>
				
			</div>
		)
	}
}
