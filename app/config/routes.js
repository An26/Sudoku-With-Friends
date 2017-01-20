import React from 'react';
import { Route, Router, browserHistory, IndexRoute } from 'react-router';
import Main from '../pages/Main';
import FacebookLogin from '../FbLogin/FbLogin';

var Login = require('../pages/Login');
var GameLobby = require('../pages/GameLobby');
var PlayGame = require('../pages/PlayGame');
var UserBoard = require('../pages/UserBoard');

module.exports = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <Route path="login" component={FacebookLogin} />
    	<Route path="gameLobby" component={GameLobby} />
    	<Route path="playGame" component={PlayGame} />
    	<Route path="userBoard" component={UserBoard} />

    	<IndexRoute component={Login} />
    </Route>
  </Router>
);