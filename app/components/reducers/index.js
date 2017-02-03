import { combineReducers } from 'redux';
import logInStatus from './loginReducer';
import timeCount from './timeCountReducer';
import gameLogic from './gameLogicReducer';

export default combineReducers({
    logInStatus,
    timeCount,
    gameLogic,
})