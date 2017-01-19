var React = require('react');

var UserBoard = React.createClass({
	render: function (){
		return (
			<div>
			
				<p>This is what the user sees when they login.</p>
				<p>Displays user information and stats.</p>
				<p>Has links to connect the user to play with a friend or play byb themselves.</p>
			</div>
			)
	}
});

module.exports = UserBoard;