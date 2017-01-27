import { combineReducers } from 'redux';

import fbLog from './fbLoginReducer';
import gameStatus from './gameReducer';

export default combineReducers({
    fbLog,
    gameStatus
})