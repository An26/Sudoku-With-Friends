import React from 'react';
import { Link } from 'react-router';

export default class GameLobby extends React.Component {
	render (){
		return (
			<div>
				<p>This is the Lobby where game rooms are created so people can play with their friends
				</p>
				<Link to="/playGame"><button>Creat Game/Join</button></Link>
			</div>
		)
	}
}
