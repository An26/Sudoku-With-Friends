import React from 'react';
import FacebookLogin from './FbLogin';
import { Link } from 'react-router';

export default class Login extends React.Component {
	render() {
		const loginOp = {
			margin: '10px',
			textAlign: "center"
		}
		const imgStyle={
			textAlign: 'center',
			width: '100%',
			height: '100%',
			background: 'white',
			paddingTop: '20px',
			paddingBottom: '20px',
			border: '3px solid black'
		}
		return (
				<div className="">
					<div className="row">
						<div className="col-md-6">
						<h1 style={loginOp}>Login to play with a friend</h1>
						<form action="/login" method="POST">
								<div className="" style={loginOp}>
									<input type="email" name='email' className='form-control' placeholder="email@someplace.com" />
								</div>
								<div className='' style={loginOp}>
									<input type="password" name='password' className='form-control' placeholder="password" />
								</div>
								<div style={loginOp}>
									<button type="submit" className="btn btn-default loginBtn">Login</button>
								</div>
						</form>
							<div className="row" style={loginOp}>
								<div className="col-md-6">
									<Link to="signUp" className="signupLink">Sign up for an account</Link>
								</div>
								<div className="col-md-6">
									<FacebookLogin />
								</div>
							</div>
							</div>
							<div className="col-md-6">
								<img src="./images/sudoku.gif" alt="sudoku image" style={imgStyle} />
							</div>
					</div>
				</div>
		)
	} 
}
