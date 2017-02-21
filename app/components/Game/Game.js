
// when the user selects single player that is when this file runs

import React from 'react';
import GameInputBtn from './Features/GameInputBtn';
import TimeInterval from './Features/TimeCount';
import GameLogic from './Features/GameLogic';
import { connect } from 'react-redux';
import { gameRunning, gameStop } from '../actions/timeCountActions';
import { newPuzzle } from '../actions/gameLogicActions';


// below are the game features imported from features folder inside Game folder

@connect((store) => {
	return {
		gameRunning: store.timeCount.gameRunning,
		playerBoard: store.gameLogic.playerBoard,
	 	solution: store.gameLogic.solution,
		opponentBoard: store.gameLogic.opponentBoard,
		newPuzzle: store.gameLogic.newPuzzle
	}
})

export default class Game extends React.Component {
	constructor(context, props) {
		super(context, props)
	}

	render (){
		return (
		<div>
			<TimeInterval />
			{console.log(this.props.gameRunning)}
			{this.props.gameRunning ?
				<div>
					<GameLogic playerBoard = {this.props.playerBoard} solution={this.props.solution} />
					<GameInputBtn />
				</div>
			:
			null
			}
		</div>
		)
	}
}

