
import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';

export default class UserBoard extends React.Component {

	constructor () {
		super();
		this.state = {userData:{}};
	}



	render() {
		const userStyle = {
			border: '3px #282828 solid',
			padding: '15px',
			backgroundColor: '#fff'
		};

		const username = cookie.load('username');

		// console.log(username);

		// if (username) {
		// 	name = <p>{cookie.load('username')}</p>
		// } else { 
		// 	name = <p>{this.state.userData.username}</p>
		// }

		return (
			<div className="userContent" style={userStyle}>
				<div>User: {username ? cookie.load('username') : this.state.userData.username} </div>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Your Best Times</h3>
					</div>
					<div className="panel-body">
						Game #1: 25:43:05
					</div>
					<div className="panel-body">
						Game #2: 30:45:01
					</div>
				</div>

				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Games You've Won</h3>
					</div>
					<div className="panel-body">
						3
					</div>
				</div>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Player Stats</h3>
					</div>
					<div className="panel-body">
						Average Time: 30:02 min
					</div>
					<div className="panel-body">
						Number of Games: 4
					</div>
				</div>
			</div>
		)
	}
}