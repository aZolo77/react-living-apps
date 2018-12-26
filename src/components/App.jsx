// libraries
import React, { Component, Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// components
import LoginForm from './LoginForm/loginForm';
import RegisterForm from './RegisterForm/registerForm';
import Navbar from './Navbar/navbar';
import Movies from './Movies/movies';
import MovieForm from './MovieForm/movieForm';
import Customers from './Customers/customers';
import Rentals from './Rentals/rentals';
import NotFound from './NotFound/notFound';
import Logout from './Logout/logout';
import ProtectedRoute from './common/protectedRoute';

// services
import auth from '../services/authService';

// styles
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  state = {};

  componentDidMount = () => {
    const user = auth.getCurrentUser();
    this.setState({ user });
  };

  render() {
    const { user } = this.state;

    return (
      <Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" exact component={LoginForm} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/register" exact component={RegisterForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={user} />}
            />
            <Route path="/customers" exact component={Customers} />
            <Route path="/rentals" exact component={Rentals} />
            <Route path="/not-found" exact component={NotFound} />
            {/* Redirect class */}
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </Fragment>
    );
  }
}
