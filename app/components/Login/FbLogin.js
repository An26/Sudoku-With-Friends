import React from 'react';
import { connect } from 'react-redux';
import { logIn, logOut } from '../actions/loginActions';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import { userLoginDetails } from '../actions/loginActions'

// import connect
@connect((store) => {
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
  var self = this;
       // post the res to database
        if(response) {
          axios.post('/user',response).then(function(res){
            if(res.data.status == "ok") {
              self.onLogin(res.data.user);
            }
          }).catch((err) => {
            console.log(err);
          })
        } else {
          // console.log('not logged in!');
        }
  }

componentDidMount() {
    this.props.dispatch(logIn(cookie.load('username')));
    
}

onLogin(userData) {
    this.props.dispatch(logIn(userData.name));
    this.props.dispatch(userLoginDetails(userData));
    browserHistory.push('/userBoard');
    
  }

  render () {
    const fbBtn = {
      borderRadius:'15px',
      background: '#3B5998'
    }
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
                cssClass="my-facebook-button-class btn btn-default loginBtn"
                buttonText="Login With Facebook"
            /> 
            :
            null
            }
      </div>
    );
  }
 
}

