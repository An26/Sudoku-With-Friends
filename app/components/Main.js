import React from 'react';
import Header from './Header/Header';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import Radium from 'radium';
import {StyleRoot} from 'radium';

@Radium
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

	mySideTabStyles() {
		if (this.state.isTabOpen) {
			const openWidth = {
				width: '250px',
				// --------------media query------------
				'@media (max-width: 650px)':{
					padding: '3%',
					margin: 'auto',	
					height: '350px',
					width: '100%',
					postion: "fixed",
					left: '0px',
					top: "50px",
					zIndex: '1',
					transition: '0.3s'

				}
			};
			return openWidth;
		} else {
			const closedWidth = {
				width: '0px',
				// --------------media query------------
				'@media (max-width: 650px)':{
					margin: 'auto',	
					height: '0px',
					width: '100%',
					postion: "fixed",
					left: '0px',
					top: "50px",
					zIndex: '2',
					transition: '0.3s'
				}
			};
			return closedWidth;
		}
	}

	newLeftMarginForContent() {
		if (this.state.isTabOpen) {
			const moveLeftAndDown = {
				marginLeft: '310px',
				// --------------media query------------
				'@media (max-width: 650px)':{
					marginLeft: 'auto',
					marginTop: '450px',
					width: '100%',
					height: 'auto'
				}
			}
			return moveLeftAndDown;
		} else {
			const marginRightAndUp = {
				marginLeft: '100px',
				// --------------media query------------
				'@media (max-width: 650px)':{
					marginLeft: 'auto',
					marginTop:'50px',
					width: '100%',
					height: 'auto'
				}
			}
			return marginRightAndUp;
		}
	}

	render () {

		let tabs;
		const isLoggedIn = cookie.load('username');	
		const btnImg = this.state.isTabOpen ? "./images/cross.png" : "./images/menu.svg";

		const openSideBar = {
			    height: '100%',
				width: '50px',
				position: 'fixed',
				zIndex: '1',
				top: '0',
				left: '0',
				paddingTop: '60px',
				backgroundColor: '#CF9E00',
			//------------------media query------------------- 
			'@media (max-width: 650px)':{
				height: '50px',
				width: '100%',
				position: 'fixed',
				// zIndex: '1',
				top: '0',
				left: '0',
				padding: '2.5%'
				}
		};

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
					<StyleRoot>
					<div className="openMySideNavBar">
							<div className="openSideNavBarBtn" style={openSideBar}>
								<a href="#" onClick={this.toggleBtn.bind(this)}><img className="menuBtn" src={btnImg} alt="menu btn"  width="30px" height="auto"/></a>
							</div>
					</div>
						<div className ="mySidenav" style={this.mySideTabStyles()} >
							{tabs}
						</div>
						<div className="content">
							<Header style={this.newLeftMarginForContent()}/>
							<div className="main" style={this.newLeftMarginForContent()}>
								{this.props.children}
							</div>
						</div>
					</StyleRoot>
				</div> 
			
		)
	}
}
