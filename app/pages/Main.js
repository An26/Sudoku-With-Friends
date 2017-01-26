import React from 'react';
import Header from './Header/Header';
import {Link} from 'react-router';
import cookie from 'react-cookie';

export default class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			activeTab: ""
		}
	}

	appendClass(event) {


		this.setState({activeTab: event.target.id});

		console.log("username: " + cookie.load('username'));
		
	}

	render () {
		return(
			<div className="container">
				<div className="row">
					<Header />
					<div className="row">
						<ul className="nav nav-tabs">
							<li role="presentation" className={(this.state.activeTab === "login") ? "active" : ""}>
								<Link to="/">
								<button className="btn btn-default naviTabi1" id="login" onClick={this.appendClass.bind(this)}>Login/Logout</button>
								</Link>
							</li>
							<li role="presentation" className={(this.state.activeTab === "gameLobby") ? "active" : ""}>
								<Link to="/gameLobby">
								<button className="btn btn-default naviTabi" id="gameLobby" onClick={this.appendClass.bind(this)}>Game Lobby</button>
								</Link>
							</li>
							<li role="presentation" className={(this.state.activeTab === "userBoard") ? "active" : ""}>
								<Link to="/userBoard">
								<button className="btn btn-default naviTabi" id="userBoard" onClick={this.appendClass.bind(this)}>User Board</button>
								</Link>
							</li>
							<li role="presentation" className={(this.state.activeTab === "Game") ? "active" : ""}>
								<Link to="/game">
								<button className="btn btn-default naviTabi" id="game" onClick={this.appendClass.bind(this)}>Game</button>
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="content">
					{this.props.children}
				</div>

			</div> 
			)
	}
}
