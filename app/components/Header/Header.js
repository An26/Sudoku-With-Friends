import React from 'react';
//import Main from './../Main';
import cookie from 'react-cookie';


export default class Header extends React.Component {


    render() {
		const isLoggedIn = cookie.load('username');
        const headerStyle = {  
        }
		console.log("username: "+ cookie.load('username'));

        return (
            <div className="mainHeaderDiv" style={headerStyle}>
                <div className="headerDiv" style={this.props.style}>
                    <span className="headerTitle"> Sudoku with Friends</span>
                    <div className="welcomeUser">
                        {isLoggedIn ? (
                            <h1>Welcome {cookie.load('username')}! </h1> 
                            ) : (
                            <h1>Welcome!</h1>)
                        }
                    </div>
                </div>
			</div>
        )
    }
}