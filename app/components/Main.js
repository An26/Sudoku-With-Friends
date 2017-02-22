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
		this.setState({isTabOpen: !this.state.isTabOpen})
	}

	sideTabStyles() {
		if (this.state.isTabOpen) {
			return 'activeSideTab';
		} else {
			return 'notActiveSideTab';
		}
	}

	newLeftMarginForContent(){
		if(this.state.isTabOpen) {
			return "moveLeft";
		} else {
			return "moveRight";
		}
	}

	render () {

		let tabs;
		const isLoggedIn = cookie.load('username');	
		const btnImg = this.state.isTabOpen ? "/public/images/cross.png" : "public/images/menu.svg";
		
		if (isLoggedIn) {
			tabs = 	<div>
						{/*<Link to="/userBoard">User Board/Stats</Link>*/}
						<br />
						<Link to="/gameLobby">Game Lobby: Find Friends</Link>
						<br />
						<Link to="/">Exit Here</Link>
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
						<div className ="mySidenav" id={this.sideTabStyles()}>
							{tabs}
						</div>
						<div className="main-content">
							<Header id={this.newLeftMarginForContent()}/>
							<div className="main" id={this.newLeftMarginForContent()}>
								{this.props.children}
							</div>
						</div>
		
				</div> 
			
		)
	}
}
