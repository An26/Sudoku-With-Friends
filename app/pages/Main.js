import React from 'react';
import Header from './Header/Header';


var Main = React.createClass({
	render: function(){
		return(
			<div className="container">
				<div className="row">
					<Header />
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