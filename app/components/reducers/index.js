import { combineReducers } from 'redux';
import logInStatus from './loginReducer';
import timeCount from './timeCountReducer';
import gameLogic from './gameLogicReducer';
import multiplayer from './multiplayerGameReducer';
import gameType from './gameTypeReducer';

export default combineReducers({
    logInStatus,
    timeCount,
    gameLogic,
    multiplayer,
    gameType
})