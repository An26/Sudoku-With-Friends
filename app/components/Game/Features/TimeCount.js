import React from 'react';
import { gameRunning, timeInterval, stopTimeInterval } from '../../actions/timeCountActions';
import { newPuzzle } from '../../actions/gameLogicActions.js';
import { connect } from 'react-redux';
import gameGen from '../Js/gameGenerator';

var interval;
@connect((store) => {
   return {
     gameRunning: store.timeCount.gameRunning,
	 timeInterval: store.timeCount.timeInterval
   };
})

export default class TimeInterval extends React.Component {
    constructor(props, context) {
		super(props, context);
    }

	startGame(event) {
        event.preventDefault();
        this.props.dispatch(gameRunning(true));		
		interval = setInterval(function() {
			if(this.props.gameRunning) {
				this.props.dispatch(gameRunning(true));
				this.props.dispatch(timeInterval());
			} 
            else {
                this.props.dispatch(gameRunning(false));
			  }
		}.bind(this), 1000);
		return;
	}

    componentWillUnmount() {
        this.stopGame();

    }

    stopGame(){
        this.props.dispatch(gameRunning(false));
		clearInterval(interval);
        this.props.dispatch(stopTimeInterval())
        this.props.dispatch(newPuzzle());

    }

    render() {
        return(
            <div>
                {!this.props.gameRunning ?
				<div>
					<h1>Please press start to start the game</h1>
					<button id="startGame" onClick={this.startGame.bind(this)}>Start Game</button>
				</div>
			    :
                <div>
					Time: {this.props.timeInterval}
                    <br />
                    <button id="stopGame" onClick={this.stopGame.bind(this)}>Stop Game</button>
                </div>
                }
            </div>
        )
    }

}