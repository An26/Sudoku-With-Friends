// importing all the files
import React from 'react';
import { Route, Router, browserHistory, IndexRoute } from 'react-router';
import Main from '../components/Main';
import Login from '../components/Login/Login';
import GameLobby from '../components/Game/Pages/GameLobby';
import PlayGame from '../components/Game/Pages/PlayGame';
import UserBoard from '../components/Game/Pages/UserBoard';
import Game from '../components/Game/Game';
import SignUp from '../components/Login/SignUp';

// all the routes on the page
module.exports = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
    	<Route path="gameLobby" component={GameLobby} />
			<Route path="signUp" component={SignUp} />
    	<Route path="playGame" component={PlayGame} />
    	<Route path="userBoard" component={UserBoard} />
    	<Route path="game" component={Game} />
    	<IndexRoute component={Login} />
    </Route>
  </Router>
);