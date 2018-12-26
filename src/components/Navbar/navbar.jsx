// libraries
import React, { Component, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    const { user } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <Link className="navbar-brand" to="/">
          Reinstallation
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {!user && (
              <Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </Fragment>
            )}
            {user && (
              <Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/movies">
                    Movies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/customers">
                    Customers
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/rentals">
                    Rentals
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    {user.name[0].toUpperCase() + user.name.slice(1)}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}
