import React from 'react';
//import Main from './../Main';
import cookie from 'react-cookie';
import Radium from 'radium';
import {StyleRoot} from 'radium';

@Radium
export default class Header extends React.Component {


    render() {
		const isLoggedIn = cookie.load('username');
        return (
            <div className="mainHeaderDiv">
                <StyleRoot>
                    <div className="headerDiv" style={this.props.style}>
                    <div className="welcomeHeader">Sudoku with Friends</div>
                    <div>
                        {isLoggedIn ? (
                            <h1  className="welcomeUser">Welcome {cookie.load('username')}! </h1> 
                            ) : (
                            <h1>Welcome!</h1>)
                        }
                    </div>
                </div>
                </StyleRoot>
			</div>
        )
    }
}