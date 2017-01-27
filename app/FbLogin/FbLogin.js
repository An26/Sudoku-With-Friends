import React from 'react';
import { connect } from 'react-redux';
import { fbLogIn, fbLogOut } from '../actions/fbLoginActions';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

// import connect
@connect((store) => {
   return {
     logIn: store.fbLog.logIn
   }; 
})

// facebook login logic
export default class Login extends React.Component {   
    constructor (props, context) {
    super(props, context);
    // this.state = {
    //     loggedIn: cookie.load('username') ? true : false
    // };
}
  responseFacebook (response) {  
      console.log('res', response); 
        this.onLogin(response)
        // post the res to database
  }

componentWillMount() {
    this.props.dispatch(fbLogIn(cookie.load('username')));
}

  onLogin(fbData) {
    cookie.save('userId', fbData.id);
    cookie.save('username', fbData.first_name);
    this.props.dispatch(fbLogIn(cookie.load('username')));
    browserHistory.push('/userBoard');
  }

onLogout() {
    cookie.remove('userId');
    cookie.remove('username');
    this.props.dispatch(fbLogOut());
    browserHistory.push('/');
  }


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
