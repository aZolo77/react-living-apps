// libraries
import React, { Component, Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

// components
import Navbar from './Navbar/navbar';
import Movies from './Movies/movies';
import MovieForm from './MovieForm/movieForm';
import Customers from './Customers/customers';
import Rentals from './Rentals/rentals';
import NotFound from './NotFound/notFound';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
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
