import React from 'react';
import  Chat  from './../Features/Chat';
import TimeInterval from './../Features/TimeCount';
import GameLogic from './../Features/GameLogic';
import { connect } from 'react-redux';
import { gameRunning, gameStop } from './../../actions/timeCountActions';
import GameInputBtn from './../Features/GameInputBtn';
// import gameGen from '../Js/gameGenerator';

@connect((store) => {
	return {
		gameRunning: store.timeCount.gameRunning,
		opponentsGameBoard: store.multiplayer.opponentsGameBoard
	}
})

export default class PlayGame extends React.Component {
		constructor(context, props){
			super(context, props);
		}
	
	 generateCells(rowNumber) {		
    	var rows = [];
    	for (var i = rowNumber*9; i < rowNumber*9+9; i++) {
    		if(this.props.opponentsGameBoard[i]==="" || this.props.opponentsGameBoard[i] === null) {
    			rows.push(
					<td className="opTd" key={i}>
					<input id={i}
						placeholder="_" 
						className="opCell"
						type="integer" 
						maxLength="1" 
						min="1" 
						max="9"/>
					</td>)
    		} else {
    		rows.push(<td className="opTd" key={i} id={i}>{this.props.opponentsGameBoard[i]}</td>)
    		}
    	}
    	return rows;
    }

	generateGame() {
		
    	var board=[];
    	for (var i = 0; i < 9; i++) {
    		board.push(<tr className="opTr" key={i}>
    			{this.generateCells(i)}
    		</tr>);
    	}
    	return board;
    }



	render() {
		const divStyle = {
			padding: '10px',
			// border: '3px black solid',
			margin: '10px'
		}
		return(
			<div className="mainContainer">
				{/*<p>This is the place where users actually play sudoku with a friend</p>
				<div>game level/difficulty here??</div>
				*/}
				<div className="row">
					<div className="col-md-8 col-sm-12 activeGame" style={divStyle}>
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
					<div className="col-md-3 OpponentGame" style={divStyle}>
						{/*{this.props.opponentsGameBoard}*/}
						<div className="opponentName">Opponent Game:</div>
						{this.generateGame()}
						
					</div>
				</div>

				<div className="chatBox" style={divStyle}>
					<Chat />
				</div>
			</div>
			)
	}
};

