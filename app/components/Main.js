var React = require('react');

var Main = React.createClass({
	getInitialState() {

		return { activeTab: "" }
	},

	appendClass(event) {

		console.log(event.target.id);
		this.setState({activeTab: event.target.id});
		
		// $('#a').attr("class", "active");
		// console.log(this);
		// $('#b').attr("class", "active");
		// $('#c').attr("class", "active");
		// $('#d').attr("class", "active");

	},

	render: function(){
		return(
			<div className="container">
				<div className="row">
					<div className="jumbotron">
						<h4>Welcome to...</h4>
						<h1>Sudoku with Friends</h1>
					</div>

					<ul className="nav nav-tabs">
						<li role="presentation" className={(this.state.activeTab === "login") ? "active" : ""}>
							<a href="#/login">
							<button className="btn btn-default naviTabi1" id="login" onClick={this.appendClass}>Login/Logout</button>
							</a>
						</li>
						<li role="presentation" className={(this.state.activeTab === "gameLobby") ? "active" : ""}>
							<a href="#/gameLobby">
							<button className="btn btn-default naviTabi" id="gameLobby" onClick={this.appendClass}>Game Lobby</button>
							</a>
						</li>
						<li role="presentation" className={(this.state.activeTab === "playGame") ? "active" : ""}>
				            <a href="#/playGame">
				            <button className="btn btn-default naviTabi" id="playGame" onClick={this.appendClass}>Play Game</button>
				            </a>
				        </li>
				        <li role="presentation" className={(this.state.activeTab === "userBoard") ? "active" : ""}>
				            <a href="#/userBoard">
				            <button className="btn btn-default naviTabi" id="userBoard" onClick={this.appendClass}>User Board</button>
				            </a>
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