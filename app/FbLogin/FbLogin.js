import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import cookie from 'react-cookie';

export default class Login extends React.Component {
    
    constructor (props, context) {
    super(props, context);
    this.state = {
        loggedIn: cookie.load('username') ? true : false
    };
}
  responseFacebook (response) {  
      console.log('res', response); 
        this.onLogin(response)
        // post the res to database
  }

  onLogin(res) {
    cookie.save('userId', res.id);
    cookie.save('username', res.first_name);
    this.setState({
        loggedIn: true
    });
  }

onLogout() {
    cookie.remove('userId');
    cookie.remove('username');
    this.setState({
        loggedIn: false
    });
  }


  render () {
    return (
      <div>
        {!this.state.loggedIn ?
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
