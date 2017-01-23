import React from 'react';
import { Route, Router, browserHistory, IndexRoute } from 'react-router';
import Main from '../pages/Main';

import Login from '../pages/Login';
import GameLobby from '../pages/GameLobby';
import PlayGame from '../pages/PlayGame';
import UserBoard from '../pages/UserBoard';
import Chat from '../Chat/Chat';

module.exports = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
    	<Route path="gameLobby" component={GameLobby} />
    	<Route path="playGame" component={PlayGame} />
    	<Route path="userBoard" component={UserBoard} />
      <Route path="chat" component={Chat} />
    	<IndexRoute component={Login} />
    </Route>
  </Router>
);