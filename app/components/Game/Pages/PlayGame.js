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
			<div className="mainContainer">
				<p>This is the place where users actually play sudoku with a friend</p>
				<div>game level/difficulty here??</div>
				
				<div className="row">
					<div className="col-md-5 col-sm-12 activeGame" style={divStyle}>
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

					<div className="col-md-5 col-sm-12 OpponentGame" style={divStyle}>
						<div className="opponentName">Opponent Name</div>
						<div className="opponentBoard">Opponent's game board</div>
					</div>
				</div>

				<div className="chatBox" style={divStyle}>
					<Chat />
				</div>
			</div>
			)
	}
};

