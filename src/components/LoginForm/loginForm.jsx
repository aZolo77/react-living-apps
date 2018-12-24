// libraries
import React from 'react';
import Joi from 'joi-browser';

// components
import Form from '../common/form';

export default class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {}
  };

  // Joi validation schema
  schema = {
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  };

  render() {
    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderBtn('Login')}
        </form>
      </div>
    );
  }

  doSubmit = () => {
    // Call the Server to Log In
    console.log('Submit: ', this.state.data);
  };
}
