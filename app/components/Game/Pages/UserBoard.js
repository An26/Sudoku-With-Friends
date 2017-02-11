
import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';

export default class UserBoard extends React.Component {

	constructor () {
		super();
		this.state = {userData:{}};
	}
	componentDidMount() {
		var userId = cookie.load('userId');
		var self = this;
		axios.get('/user/'+userId).then(function(res){
			// console.log('resssss', res.data.userData);
			//var data = res.data.userData[0];
			//console.log('data',data);
			self.setState({userData:res.data.userData[0]});
			console.log('state',self.state.userData);
		})
	}
	


	render() {
		const userStyle = {
			border: '3px #282828 solid',
			padding: '15px',
			backgroundColor: '#fff'
		}
		return (
			<div className="userContent" style={userStyle}>
			{/*{console.log('newdata',data)}*/}
				<div>UserName: {this.state.userData.username} John Wick</div>
				<div>ID Numer: {this.state.userData._id} 3457zt7b</div>

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
