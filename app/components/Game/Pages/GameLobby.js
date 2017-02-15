import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// import gameGen from '../Js/gameGenerator';
import { createRoom, joinRoom, roomDetails, joinRoomId, opponentsGameBoard } from '../../actions/multiplayerGameActions';
import cookie from 'react-cookie';
var Promise = require("bluebird");
import axios from 'axios';
import Game from '../Game';
import { gameType } from '../../actions/gameTypeActions';

@connect((store)=> {
	return {
		// createRoom: store.multiplayer.createRoom,
		playerBoard: store.gameLogic.playerBoard,
	 	solution: store.gameLogic.solution,
		logIn: store.logInStatus.loggedIn,
		joinRoom: store.multiplayer.joinRoom,
		roomDetails: store.multiplayer.roomDetails,
	 	joinRoomId: store.multiplayer.joinRoomId,
		gameType: store.gameType.gameType
	}
})
export default class GameLobby extends React.Component {
	constructor(props,context) {
		super(props, context);
		this.state = {
			message: "",
		}
}

// create your own room starts here
// user created the room by entering room name which gets posted to the database where we check
// if the room already exist then user gets a  message back else room gets created and user is 
// redirected to the new page
	postGameDetails(room) {	
		let self = this;

		if(this.props.logIn) {		
			axios.post('/api/game', 
			{
				roomName: room, 
				initialBoard: this.props.playerBoard,
				solution: this.props.solution,
				username : cookie.load('username')				
			}).then((res)=> {
				if(res.data.status === 'failure') {
					self.setState({message: "Room Name Already Exist"});
					return false;
				} else {
					self.props.dispatch(roomDetails({'id': res.data.id, 'roomLength': res.data.roomLength}))		
					browserHistory.push('/playGame/'+ res.data.id);
				}
			}).catch(function(err){
				console.log(err)
			})
		}
	}

// getting the input value when user types room name
	getRoomName(event) {
		event.preventDefault();
		let room = document.getElementById('roomName').value;
		if(room === "") {
			return false;
		} 
		this.postGameDetails(room);
		
	}	

// end of create your own room

// join a room starts here
// getting the data from an ajax call with all the room available and sending it to a reducer`
	componentDidMount() {
		var self = this;
		axios.get('/api/game').then(function(res) {
			self.props.dispatch(joinRoom(res.data))
		})
	}
	
// getting the join room id which is attached with join room button for each room
	joinGameRoom( evt ) {
		let self = this;
		let id = evt.target.value;
		this.props.dispatch(joinRoomId(id));
		axios.put('/api/game/'+ id +'/join', {player: (cookie.load('username'))})
		.then(function(res){
			const status = res.data;
			if(res.data.status === "ok") {
				browserHistory.push('/playGame/' + id);
			} else {
				console.log('room is not available');
			}
		}).catch((err) => {
			if(err)throw err;
		})		
	}

// checking if the game is multiplayer and single player game. if the game is multiplayer
//then display rooms available and the option to create your own room. else display start button to start 
//the game
	isMultiPlayer(event) {
		this.props.dispatch(gameType(event.target.value))
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
				<hr />
				
				<h2>Select Single Player or Multiplayer</h2>
					<form>
						<input type="radio" name="chooseone" value ="single" onChange={this.isMultiPlayer.bind(this)} checked={this.props.gameType==="single"} />Single Player
						<input type="radio" name="chooseone" value ="multi" onChange={this.isMultiPlayer.bind(this)} checked={this.props.gameType==="multi"} />Multi-Player
					</form>
				<hr />
				{this.props.gameType === "single" ?
					<Game />
				:	
				<div>
					<h3>Create Your Own Room!</h3>
					<div>
						<form onSubmit={this.getRoomName.bind(this)} >
							{this.state.message !== "" ?
								<p style={{color: "red"}}>{this.state.message}</p>
							:
							null
							}
							<div>
								<input id="roomName" type="text" placeholder="enter your room name" required/>
								<button  className="btn btn-default">Create Room</button>
							</div>
						</form>
					</div>
					<hr />

					<h3>Here is a list of open rooms to join!</h3>
						{this.props.joinRoom.map((ele, i)=>{
							return (
								<div key={i}> 
									{ele.players < 2 ?				
										<div className="holdRooms roomCard card-block" style={cardStyle}>	
											<h4 className="card-title"> {ele.roomName} Room</h4>
											{/*<h4>Difficulty Level: {gameGen.difficulty}</h4>*/}
											<img className="card-img-top" src="./images/table.svg" alt="Card image cap" />
											<p className="card-text">{ele.players} player is waiting</p>
											<button onClick={this.joinGameRoom.bind(this)} value={ele.id} className="joinRoom">Join</button>	
										</div>
									:
									null	
									}
								</div>
							)
						})}	
						</div>	
					}
			</div>
		)
	}
}
