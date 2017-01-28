import React from 'react';
import Header from './Header/Header';
import {Link} from 'react-router';
import cookie from 'react-cookie';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			//width: '250px',
			isTabOpen: 'true'
		}
	}

	toggleBtn() {
		console.log("state: " + this.state.isTabOpen)
		this.setState({isTabOpen: !this.state.isTabOpen})
	}

	getNewWidth() {
		if (this.state.isTabOpen) {
			return '250px';
		} else {
			return '0px';
		}
	}

	render () {
		let tabs;
		const isLoggedIn = cookie.load('username');
		console.log("username: "+ cookie.load('username'))

		if (isLoggedIn) {
			tabs = 	<div>
						<Link to="/userBoard">User Board/Stats</Link>
						<br />
						<Link to="/game">Play Sudoku</Link>
						<br />
						<Link to="/gameLobby">Game Lobby: Play w/ Friends</Link>
						<br />
						<Link to="/">Logout</Link>
					</div>;
								
		} else {
 			tabs = 	<div>
			 			<Link to="/">Login to Play with friends</Link>
						 <br />
						<Link to="/game">Play Sudoku</Link>
					</div>;
		}

		return(
			<div className="container">
				<div className="row">
					<Header style={{marginLeft: this.getNewWidth()}} //give it a property 
					/>
					<div>
						
						<div className ="mySidenav" style={{width : this.getNewWidth()}} >
							{tabs}
						</div>
					</div>
				</div>
				<div className="main" style={{marginLeft : this.getNewWidth()}}>
					<button onClick={this.toggleBtn.bind(this)}>open/close menue</button>
					{this.props.children}
				</div>

			</div> 
			)
	}
}
