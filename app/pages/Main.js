import React from 'react';
import Header from './Header/Header';


export default class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			activeTab: ""
		}
	}

	appendClass(event) {

		// console.log(event.target.id);
		this.setState({activeTab: event.target.id});
		
		// $('#a').attr("class", "active");
		// console.log(this);
		// $('#b').attr("class", "active");
		// $('#c').attr("class", "active");
		// $('#d').attr("class", "active");
	}

	render () {
		return(
			<div className="container">
				<div className="row">
					<Header />
					<div className="row">
						<ul className="nav nav-tabs">
							<li role="presentation" className={(this.state.activeTab === "login") ? "active" : ""}>
								<a href="/login">
								<button className="btn btn-default naviTabi1" id="login" onClick={this.appendClass.bind(this)}>Login/Logout</button>
								</a>
							</li>
							<li role="presentation" className={(this.state.activeTab === "gameLobby") ? "active" : ""}>
								<a href="/gameLobby">
								<button className="btn btn-default naviTabi" id="gameLobby" onClick={this.appendClass.bind(this)}>Game Lobby</button>
								</a>
							</li>
							<li role="presentation" className={(this.state.activeTab === "playGame") ? "active" : ""}>
								<a href="/playGame">
								<button className="btn btn-default naviTabi" id="playGame" onClick={this.appendClass.bind(this)}>Play Game</button>
								</a>
							</li>
							<li role="presentation" className={(this.state.activeTab === "userBoard") ? "active" : ""}>
								<a href="/userBoard">
								<button className="btn btn-default naviTabi" id="userBoard" onClick={this.appendClass.bind(this)}>User Board</button>
								</a>
							</li>
							<li role="presentation" className={(this.state.activeTab === "Game") ? "active" : ""}>
								<a href="/game">
								<button className="btn btn-default naviTabi" id="game" onClick={this.appendClass.bind(this)}>Game</button>
								</a>
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
