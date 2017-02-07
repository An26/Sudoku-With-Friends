import React from 'react';


export default class SignUp extends React.Component {
	render() {
		return (
			<div>
				<h1>Sign Up to play with all your friends!</h1>
				<form action="" method="POST">
					<div className="row">
						<div>
							Email: <input type="email" name='email' className='form-control' placeholder="email@someplace.com" />
						</div>
						<div>
							Password: <input type="password" name='password' className='form-control' placeholder="Password" />
						</div>
						<button>Sign Up</button>
					</div>
				</form>
			</div>
		)
	} 
}
