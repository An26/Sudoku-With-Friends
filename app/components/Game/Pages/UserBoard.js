import React from 'react'

export default class UserBoard extends React.Component {
	render() {
		const userStyle = {
			border: '3px #282828 solid',
			padding: '15px',
			backgroundColor: '#fff'
		}
		return (
			<div className="userContent" style={userStyle}>
				<div>UserName: _____ </div>
				<div>ID Numer</div>
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title"># of Games You've Played</h3>
					</div>
					<div class="panel-body">
						# of games pulled dynamically from database
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">Your Times</h3>
					</div>
					<div class="panel-body">
						Times of the games you won.
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title"># of Games You've Won</h3>
					</div>
					<div class="panel-body">
						# of wins pulled dynamically from database
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">Player Stats</h3>
					</div>
					<div class="panel-body">
						Average time of won games for level 1
					</div>
					<div class="panel-body">
						Average time of won games for level 2
					</div>
					<div class="panel-body">
						Average time of won games for level 3
					</div>
					<div class="panel-body">
						Average time of won games for level 4
					</div>
					<div class="panel-body">
						Average time of won games for  level 5
					</div>
				</div>

				<p>Your best game!</p>

				<p>ranking with all the users in the database?? Chart here...</p>

			</div>
		)
	}
}
