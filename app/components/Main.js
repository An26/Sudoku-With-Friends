import React from 'react';
import Header from './Header/Header';
import { Link } from 'react-router';
import cookie from 'react-cookie';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			isTabOpen: 'true'
		}
	}
	toggleBtn() {
		// console.log("state: " + this.state.isTabOpen)
		this.setState({isTabOpen: !this.state.isTabOpen})
	}

	getNewWidth() {
		if (this.state.isTabOpen) {
			return '250px';
		} else {
			return '0px';
		}
	}

	getNewLeftMargin() {
		if (this.state.isTabOpen) {
			return '400px';
		} else {
			return '100px';
		}
	}

	render () {
		let tabs;
		const isLoggedIn = cookie.load('username');
		// console.log("username: "+ cookie.load('username'));	

		var btnImg = this.state.isTabOpen ? "./images/cross.png" : "./images/menu.svg";

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
				<div className="openMySideNavBar">
					<div className="openSideNavBarBtn">
						<a href="#" onClick={this.toggleBtn.bind(this)}><img className="menuBtn" src={btnImg} alt="menu btn"  width="30px" height="auto"/></a>
					</div>
				</div>
				<div className ="mySidenav" style={{width : this.getNewWidth()}} >
					{tabs}
				</div>
				<div className="content">
					<Header style={{marginLeft: this.getNewLeftMargin()}}/>
					<div className="main" style={{marginLeft : this.getNewLeftMargin()}}>
						{this.props.children}
					</div>
				</div>
			</div> 
			)
	}
}
