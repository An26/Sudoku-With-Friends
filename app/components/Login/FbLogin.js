import React from 'react';
import { connect } from 'react-redux';
import { logIn, logOut } from '../actions/loginActions';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

// import connect
@connect((store) => {
  console.log(store);
   return {
     logIn: store.logInStatus.loggedIn
   }; 
})

// facebook login logic
export default class Login extends React.Component {   
    constructor (props, context) {
    super(props, context);
}

responseFacebook (response) {  
        this.onLogin(response);
       // post the res to database
        if(response) {
          axios.post('/user',response).then(function(err,res){
          if(err) throw err;
          console.log('login info put in database!');  
          })
        } else {
          console.log('not logged in!');
        }
  }

componentDidMount() {
    this.props.dispatch(logIn(cookie.load('username')));
    
}

// shouldComponentUpdate() {
//   if(this.isLoggedIn) {
//     return true;
//   }
//   return false
// }

// isLoggedIn() {
//   return this.props.logIn
// }

onLogin(fbData) {
    cookie.save('userId', fbData.id);
    cookie.save('username', fbData.first_name);
    this.props.dispatch(logIn(cookie.load('username')));
    browserHistory.push('/userBoard');
    
  }

onLogout() {
    cookie.remove('userId');
    cookie.remove('username');
    this.props.dispatch(logOut());
    browserHistory.push('/');
  }

  // componentDidUpdate() {
  //   console.log('logged', this.props.logIn);
  // }


  render () {
    return (
      <div>
            {!this.props.logIn ?
            <FacebookLogin appId="1409495172429100"
                language="en_US"
                scope="public_profile,email"
                fields="first_name,last_name,picture,gender,email"
                callback={this.responseFacebook.bind(this)}
                xfbml={true}
                version="v2.5"
                class="facebook-login"
                buttonText="Login With Facebook"
            /> 
            :
            <button onClick={this.onLogout.bind(this)} type="button">logout</button>
            }
      </div>
    );
  }
 
}
