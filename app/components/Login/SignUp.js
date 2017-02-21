import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { logIn, logOut, userLoginDetails } from '../actions/loginActions';

@connect((store) => {
	return {
		userLoginDetails: store.logInStatus.userLoginDetails
	}
})

export default class SignUp extends React.Component {
	constructor(context, props) {
		super(context,props);
		this.state = {
			message: ''
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		let userLogin = {
			email: document.getElementById('email').value,
			password: document.getElementById('pass').value,
			first_name: document.getElementById('name').value,
		}
		this.postUserDetails(userLogin)		
	}

	postUserDetails(userLogin){
		var self = this;
		axios.post('/user', userLogin).then(function(res) {
			if(res.data.status === "existingUser") {
				self.setState({message: 'User already exist, please signin'})
			} else if(res.data.status === "ok"){
				self.props.dispatch(userLoginDetails(res.data.user));
				self.props.dispatch(logIn());
				browserHistory.push('/userBoard')
			}
			}).catch((err)=> {
				console.log(err);
			})
	}

	// goToLogin(event) {
	// 	event.preventDefault();
	// 	browserHistory.push('/');
	// }

	render() {
		return (
			<div>
				<h1>Sign Up to play with all your friends!</h1>

				<h4 style={{'color': 'red'}}>{this.state.message}</h4>
				<form onSubmit={this.handleSubmit.bind(this)} action="" method="POST">

					<div className="row">
						<div>
							name: <input id="name" type="name" name='name' className='form-control' placeholder="Enter your Name" required />
						</div>
						<div>
							Email: <input id="email" type="email" name='email' className='form-control' placeholder="email@someplace.com" />
						</div>
						<div>
							Password: <input id="pass" type="password" name='pass' className='form-control' placeholder="Password" />
						</div>
						<button>Sign Up</button>
						{ this.state.message !== '' ?
							<Link to= "/"> Signin</Link>
						:
						null
						}
					</div>
				</form>
			</div>
		)
	} 
}
