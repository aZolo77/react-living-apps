// libraries
import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';

// components
import Form from '../common/form';

// services
import * as userService from '../../services/userService';
import auth from '../../services/authService';

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

  // Register new User
  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location = '/';
      toast.success(`${this.state.data.name} was registered.`);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
}
