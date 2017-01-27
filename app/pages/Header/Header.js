import React from 'react';
import FacebookLogin from '../../FbLogin/FbLogin';

export default class Header extends React.Component {
    render() {
        return (
            <div className="jumbotron">
			    <h4>Welcome to...</h4>
			    <h1>Sudoku with Friends</h1>
                <FacebookLogin />
			</div>
        )
    }
}