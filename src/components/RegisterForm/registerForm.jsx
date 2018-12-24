// libraries
import React from 'react';
import Joi from 'joi-browser';

// components
import Form from '../common/form';

export default class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {}
  };

  // Joi validation schema
  schema = {
    username: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .label('Username'),
    password: Joi.string()
      .min(5)
      .required()
      .label('Password'),
    name: Joi.string()
      .required()
      .label('Name')
  };

  render() {
    return (
      <div>
        <h3>Register</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderBtn('Register')}
        </form>
      </div>
    );
  }

  doSubmit = () => {
    // Call the Server to Log In
    console.log('Submit: ', this.state.data);
  };
}
