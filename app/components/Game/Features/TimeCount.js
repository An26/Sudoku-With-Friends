import React from 'react';
import { gameRunning, timeInterval, stopTimeInterval } from '../../actions/timeCountActions';
import { newPuzzle } from '../../actions/gameLogicActions.js';
import { connect } from 'react-redux';
import gameGen from '../Js/gameGenerator';
import axios from 'axios';
import { browserHistory } from 'react-router';
var interval;

@connect((store) => {
   return {
     gameRunning: store.timeCount.gameRunning,
	 timeInterval: store.timeCount.timeInterval,
     logIn: store.logInStatus.loggedIn,
    //  roomLength: store.gameLogic.roomLength,
     roomDetails: store.multiplayer.roomDetails,
     gameType: store.gameType.gameType
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
	}

    componentWillUnmount() {
        this.stopGame();
    }

    stopGame(){
            this.props.dispatch(gameRunning(false));
		    clearInterval(interval);
            this.props.dispatch(stopTimeInterval()) 
            if(this.props.gameType === "single") {
                this.props.dispatch(newPuzzle());
            }
    }



/* @!gameRunning -->
    single player -> display start button,
    multi player {
        2 players joined in --> display start button
        <2 players --> wait for opponent to start the game
    }
    @gameRunning -> display time interval and stop button  
*/
    render() {
        return(
                
                <div>       
                    {this.props.gameType === "single" && !this.props.gameRunning ?
                        <div>
                            {/*{console.log(this.props.gameType)}*/}
                            <h1>Press start to start the game</h1>
                            <button  className="btn btn-default" id="startGame" onClick={this.startGame.bind(this)}>Start Game</button>
                        </div>
                    :
                    this.props.gameType === "single" && this.props.gameRunning ?
                        <div>
                            
                            Time: {this.props.timeInterval}
                            <br />
                            <button  className="btn btn-default" id="stopGame" onClick={this.stopGame.bind(this)}>Stop Game</button>
                        </div>
                    :
                    null
                    }
                <div>    
                    {this.props.logIn ?   
                    <div>
                        {this.props.gameType === "single" && !this.props.gameRunning ?
                            <div>
                                <h1>Press start to start the game</h1>
                                <button  className="btn btn-default" id="startGame" onClick={this.startGame.bind(this)}>Start Game</button>
                            </div>
                        :
                        this.props.gameType === "single" && this.props.gameRunning ?
                            <div>
                                
                                Time: {this.props.timeInterval}
                                <br />
                                <button  className="btn btn-default" id="stopGame" onClick={this.stopGame.bind(this)}>Stop Game</button>
                            </div>
                        :
                        null
                        }
                    </div>
                :
                !this.props.logIn && !this.props.gameRunning ?
                    <div>
                        <h1>Press start to start the game</h1>
                        <button  className="btn btn-default" id="startGame" onClick={this.startGame.bind(this)}>Start Game</button>
                    </div>
                :
                !this.props.logIn && this.props.gameRunning ?
                    <div>
                        
                       Time: {this.props.timeInterval}
                        <br />
                        <button  className="btn btn-default" id="stopGame" onClick={this.stopGame.bind(this)}>Stop Game</button>
                    </div>
                :
                null
                }
>>>>>>> ea85bdad18c70aae93060b3e0d2da63be0b9b2c6


                    {this.props.gameType === 'multi' && this.props.roomDetails.roomLength === 2 && !this.props.gameRunning ?
                        <div>
<<<<<<< HEAD
                            {/*{console.log(this.props.gameType)}*/}
=======
>>>>>>> ea85bdad18c70aae93060b3e0d2da63be0b9b2c6
                            <h1>Press start to start the game</h1>
                            <button  className="btn btn-default" id="startGame" onClick={this.startGame.bind(this)}>Start Game</button>
                        </div>
                    : this.props.gameType === 'multi' && this.props.roomDetails.roomLength < 2 ?
                        <div>
                        <h4 style={{color: "red"}}>Waiting for Second Opponent</h4>   
                        </div>
                    :
                    this.props.gameType === 'multi' && this.props.roomDetails.roomLength === 2 && this.props.gameRunning ?
                     <div>
                        Time: {this.props.timeInterval}
                        <br />
                        {/*<button className="btn btn-default" onClick={this.pause.bind(this)}>Pause? : resume</button>*/}
                        <button  className="btn btn-default" id="stopGame" onClick={this.stopGame.bind(this)}>Stop Game</button>
                    </div>
                    :
                     null
                    }
                </div>
            
        )
    }

}