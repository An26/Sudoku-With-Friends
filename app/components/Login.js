var React = require('react');
<<<<<<< Updated upstream:app/components/Login.js
=======

>>>>>>> Stashed changes:app/pages/Login.js

var Login = React.createClass({
	render: function(){
		return (
			<div>
				<h1>Login to play with a friend</h1>

				<form action="" method="POST">
					<div className="row">
						<div>
							Email: <input type="email" name='email' className='form-control' placeholder="email@someplace.com" />
						</div>
						<div>
							Password: <input type="password" name='password' className='form-control' placeholder="Password" />
						</div>
					</div>

					<div className="list-inline row">
						<button type="submit" className="btn btn-default loginBtn">Login</button>
						<br />
						<br />
						<a href="#" className="signupLink">
							<span className="network-name">Sign up for an account</span>
						</a>
					</div>
				</form>
<<<<<<< Updated upstream:app/components/Login.js
=======
				

>>>>>>> Stashed changes:app/pages/Login.js
			</div>
		)
	}
});

module.exports = Login;