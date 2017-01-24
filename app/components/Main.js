<<<<<<< Updated upstream:app/components/Main.js
var React = require('react');
=======
import React from 'react';
import Header from './Header/Header';
import { Link } from 'react-router'

>>>>>>> Stashed changes:app/pages/Main.js

var Main = React.createClass({
	getInitialState() {
		return { activeTab: "" }
	},

	appendClass(event) {

		console.log(event.target.id);
		this.setState({activeTab: event.target.id});

	},

	render: function(){
		return(
			<div className="container">
				<div className="row">
<<<<<<< Updated upstream:app/components/Main.js
					<div className="jumbotron">
						<h4>Welcome to...</h4>
						<h1>Sudoku with Friends</h1>
					</div>

=======
					<Header />
					<div className="row">
>>>>>>> Stashed changes:app/pages/Main.js
					<ul className="nav nav-tabs">
						<li role="presentation" className={(this.state.activeTab === "login") ? "active" : ""}>
							<Link to ="/">
							<button className="btn btn-default naviTabi1" id="login" onClick={this.setActiveTab}>Login/Logout</button>
							</Link>
						</li>
						<li role="presentation" className={(this.state.activeTab === "gameLobby") ? "active" : ""}>
							<Link to="/gameLobby">
							<button className="btn btn-default naviTabi" id="gameLobby" onClick={this.setActiveTab}>Game Lobby</button>
							</Link>
						</li>
						<li role="presentation" className={(this.state.activeTab === "playGame") ? "active" : ""}>
				            <Link to="/playGame">
				            <button className="btn btn-default naviTabi" id="playGame" onClick={this.setActiveTab}>Play Game</button>
				            </Link>
				        </li>
				        <li role="presentation" className={(this.state.activeTab === "userBoard") ? "active" : ""}>
				            <Link to="/userBoard">
				            <button className="btn btn-default naviTabi" id="userBoard" onClick={this.setActiveTab}>User Board</button>
				            </Link>
				        </li>
					</ul>
				</div>

				<div className="content">
					{this.props.children}
				</div>

			</div> 
			)
	}
});

module.exports = Main;