import React from 'react';
import  Chat  from './../Features/Chat';
import TimeInterval from './../Features/TimeCount';
import GameLogic from './../Features/GameLogic';
import { connect } from 'react-redux';
import { gameRunning, gameStop } from './../../actions/timeCountActions';
import GameInputBtn from './../Features/GameInputBtn';

@connect((store) => {
	return {
		gameRunning: store.timeCount.gameRunning
	}
})

export default class PlayGame extends React.Component {
	render() {
		const divStyle = {
			padding: '15px',
			border: '3px black solid',
			margin: '10px'
		}
		return(
			<div>
				<p>This is the place where users actually play sudoku with a friend</p>
				<div className="chatBox" style={divStyle}>
					<Chat />
				</div>

				<div>game level/difficulty here??</div>

				<div className="activeGame" style={divStyle}>
					<TimeInterval />
						{this.props.gameRunning ?
							<div>
								<GameLogic />
								<GameInputBtn />
							</div>
						:
						null
						}
				</div>

				<div className="OpponentGame">
					<div className="opponentName"></div>
					<div className="opponentBoard"></div>
				</div>

					

			</div>
			)
	}
};

