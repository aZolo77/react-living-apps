// libraries
import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

// components
import Form from '../common/form';

// services
import auth from '../../services/authService';

export default class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {}
  };

  // Joi validation schema
  schema = {
    username: Joi.string()
      .min(3)
      .max(30)
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

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

  // Call the Server to Login
  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      await auth.login(username, password);

      const { state } = this.props.location;

      // redirect to page from location state [prop from protectedRoute]
      window.location = state ? state.from.pathname : '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });

        toast.error(ex.response.data);
      }
    }
  };
}
