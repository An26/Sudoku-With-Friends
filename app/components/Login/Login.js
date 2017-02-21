import React from 'react';
import FacebookLogin from './FbLogin';
import { Link } from 'react-router';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { logIn, logOut, userLoginDetails } from '../actions/loginActions';
import cookie from 'react-cookie';

@connect((store) => {
	return {
		logIn: store.logInStatus.loggedIn
	}
})

export default class Login extends React.Component {
	constructor(context, props) {
		super(context, props) 
			this.state = {
				message: ""
			}		
	}

	handleSubmit(event) {
			event.preventDefault();
			let userLogin = {
				email: document.getElementById('email').value,
				password: document.getElementById('password').value,
			}
			this.getUser(userLogin)
	}

	getUser(loginDetails) {
		var self = this;
		axios.get(`/user/${loginDetails.email}/${loginDetails.password}/`).then(function(response) {
			if(response.data.status == 'wrongPass') {
				self.setState({message: 'Incorrect Password'})
			} else if (response.data.status == 'ok') {
				self.props.dispatch(userLoginDetails(response.data.user));
				self.props.dispatch(logIn(response.data.user[0].name));
					browserHistory.push('/userBoard');
			} else {
				self.setState({message: 'User does not exist, Please sign up'})
			}
		}).catch(function(err) {
			console.log(err);
		})
	}

	onLogout() {
		cookie.remove('userId');
		cookie.remove('username');
		this.props.dispatch(logOut());
		location.reload();
		browserHistory.push('/');
	}

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
						{!this.props.logIn ?
							<div>
								<h1 style={loginOp}>Login to play with a friend</h1>
								<h4 style={{'color': 'red'}}>{this.state.message}</h4>
								<form onSubmit={this.handleSubmit.bind(this)} action="" method="POST">
										<div className="" style={loginOp}>
											<input id="email" type="email" name='email' className='form-control' placeholder="email@someplace.com" />
										</div>
										<div className='' style={loginOp}>
											<input id="password" type="password" name='password' className='form-control' placeholder="password" />
										</div>
										<div style={loginOp}>
											<button type="submit" className="btn btn-default loginBtn">Login</button>
										</div>
								</form>
								<div className="row" style={loginOp}>
									<div className="col-md-6">
										<Link to="signUp" className="signupLink">Sign up for an account</Link>
									</div>
								</div>
								<div className="col-md-6">
									<FacebookLogin />
								</div>
								<hr />
							</div>
						:
						<button onClick={this.onLogout.bind(this)} type="button">logout</button>
						}
						<hr/>
						<div className="col-md-6">
							<img src="/public/images/sudoku.gif" alt="sudoku image" style={imgStyle} />
						</div>
					</div>
				</div>
			</div>
		)
	} 
}
