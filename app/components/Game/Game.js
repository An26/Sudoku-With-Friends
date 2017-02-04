import React from 'react';
import  Chat  from './Features/Chat';
import GameInputBtn from './Features/GameInputBtn';
import TimeInterval from './Features/TimeCount';
import GameLogic from './Features/GameLogic';
import { connect } from 'react-redux';
import { gameRunning, gameStop } from '../actions/timeCountActions';

// below are the game features imported from features folder inside Game folder

@connect((store) => {
	return {
		gameRunning: store.timeCount.gameRunning
	}
})

export default class Game extends React.Component {

	render (){
		return (
		<div>
			<TimeInterval />
			{this.props.gameRunning ?
				<div>
					<Chat />
					<br />
					<GameLogic />
					<GameInputBtn />
				</div>
			:
			null
			}
		</div>
		)
	}
}

