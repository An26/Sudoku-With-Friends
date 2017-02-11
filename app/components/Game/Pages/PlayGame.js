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
	
	 /*generateCells(rowNumber) {		
    	var rows = [];
    	for (var i = rowNumber*9; i < rowNumber*9+9; i++) {
    		if(this.props.opponentsGameBoard==="" || this.props.opponentsGameBoard === null) {
    			rows.push(
					<td key={i}>
					<input id={i}
						placeholder="_" 
						className="cell"
						type="integer" 
						maxLength="1" 
						min="1" 
						max="9"/>
					</td>)
    		} else {
    		rows.push(<td key={i} id={i}>{this.props.opponentsGameBoard}</td>)
    		}
    	}
    	return rows;
    }

	generateGame() {
		
    	var board=[];
    	for (var i = 0; i < 9; i++) {
    		board.push(<tr key={i}>
    			{this.generateCells(i)}
    		</tr>);
    	}
    	return board;
    }*/



	render() {
		const divStyle = {
			padding: '10px',
			// border: '3px black solid',
			margin: '10px'
		}
		return(
			<div className="mainContainer">
				<p>This is the place where users actually play sudoku with a friend</p>
				<div>game level/difficulty here??</div>
				
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
						{this.props.opponentsGameBoard}
						{/*{this.generateGame()}*/}
						<div className="opponentName">Opponent Name</div>
						<div className="opponentBoard"><table className="oppTable"><tbody>
							<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							</tr>
							<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							</tr>
							<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							</tr>
							<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							</tr>
							<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							</tr>
							<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							</tr>
							<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							</tr>
							<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							</tr>
							<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							</tr>

						</tbody></table></div>
					</div>
				</div>

				<div className="chatBox" style={divStyle}>
					<Chat />
				</div>
			</div>
			)
	}
};

