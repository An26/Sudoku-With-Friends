import React from 'react';
import FacebookLogin from './FbLogin';
import { Link } from 'react-router';

export default class Login extends React.Component {
	render() {
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
						<Link to="signUp" className="signupLink">Sign up for an account</Link>
					</div>
				</form>
				<FacebookLogin />
			</div>
		)
	} 
}
