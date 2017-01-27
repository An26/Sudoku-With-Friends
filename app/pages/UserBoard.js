import React from 'react'

export default class UserBoard extends React.Component {
	render() {
		return (
			<div>		
				<p>This is what the user sees when they login.</p>

				<p>Scores</p>
				<p>number of games played</p>
				<p>average time</p>
				<p>ranking with all the users in the database</p>

				<p>Displays user information and stats.</p>
				<p>Has links to connect the user to play with a friend or play by themselves.</p>
			</div>
		)
	}
}
