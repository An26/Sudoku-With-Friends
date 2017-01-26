import React from 'react';
import  Chat  from '../Chat/Chat';

export default class Game extends React.Component {
	render() {
		return (
			<div className = "main-content">
				<div>
					<Chat />
				</div>
				<div id='sudoku-app'></div>
			</div>
		)
	}	
}
