var React = require('react');
var router = require('react-router');
var Route = router.Route;
var Router = router.Router;

var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;

var Main = require('../components/Main');
var Login = require('../components/Login');
var GameLobby = require('../components/GameLobby');
var PlayGame = require('../components/PlayGame');
var UserBoard = require('../components/UserBoard');

module.exports = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
    	<Route path="login" component={Login} />
    	<Route path="gameLobby" component={GameLobby} />
    	<Route path="playGame" component={PlayGame} />
    	<Route path="userBoard" component={UserBoard} />

    	<IndexRoute path='login' component={Login} />
    </Route>
  </Router>
);