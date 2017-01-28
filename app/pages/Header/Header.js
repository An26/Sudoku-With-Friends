import React from 'react';
//import Main from './../Main';
import cookie from 'react-cookie';


export default class Header extends React.Component {


    render() {
        let tabs;
		const isLoggedIn = cookie.load('username');
		console.log("username: "+ cookie.load('username'));

        return (
            <div style={this.props.style}>
			    <h4>Welcome to...</h4>
			    <h1>Sudoku with Friends</h1>
                {isLoggedIn ? (
                    <h1>Welcome {cookie.load('username')}! </h1> 
					) : (
					<h1>Welcome!</h1>)
				}
			</div>
        )
    }
}