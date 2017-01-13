var React = require('react');

var Main = React.createClass({
	render: function(){
		return(
			<div className="container">
				// jumbotron here
				<div className="row">
					<div className="jumbotron">
						<h4>Welcome to...</h4>
						<h1>Sudoku with Friends</h1>
					</div>
					<div className="row">
						<a href="#/login">
						<button className="btn btn-default">Login/Logout</button>
						</a>
						<a href="#/gameLobby">
						<button className="btn btn-default">Game Lobby</button>
						</a>
			            <a href="#/playGame">
			            <button className="btn btn-default">Play Game</button>
			            </a>
			            <a href="#/userBoard">
			            <button className="btn btn-default">User Board</button>
			            </a>

					</div>
				</div>

				<div className="content">
					{this.props.children}
				</div>

			</div> //main container
			)
	}
});

module.exports = Main;