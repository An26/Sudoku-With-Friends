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
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title"># of Games You've Played</h3>
					</div>
					<div className="panel-body">
						# of games pulled dynamically from database
					</div>
				</div>

				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Your Times</h3>
					</div>
					<div className="panel-body">
						Times of the games you won.
					</div>
				</div>

				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title"># of Games You've Won</h3>
					</div>
					<div className="panel-body">
						# of wins pulled dynamically from database
					</div>
				</div>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Player Stats</h3>
					</div>
					<div className="panel-body">
						Average time of won games for level 1
					</div>
					<div className="panel-body">
						Average time of won games for level 2
					</div>
					<div className="panel-body">
						Average time of won games for level 3
					</div>
					<div className="panel-body">
						Average time of won games for level 4
					</div>
					<div className="panel-body">
						Average time of won games for  level 5
					</div>
				</div>

				<p>Your best game!</p>

				<p>ranking with all the users in the database?? Chart here...</p>

			</div>
		)
	}
}
