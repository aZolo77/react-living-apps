// libraries
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// components
import Table from '../common/table';
import Like from '../common/like';

// services
import auth from '../../services/authService';

export default class MoviesTable extends Component {
  // an object for rendering columns in Child Components
  columns = [
    {
      label: 'Title',
      path: 'title',
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { label: 'Genre', path: 'genre.name' },
    { label: 'Stock', path: 'numberInStock' },
    { label: 'Rate', path: 'dailyRentalRate' },
    {
      key: 'like',
      content: movie => (
        <Like
          liked={movie.liked}
          onLikeClick={() => this.props.onLike(movie)}
        />
      )
    }
  ];

  deleteColumn = {
    key: 'delete',
    content: movie => (
      <button
        className="btn btn-large btn-outline-danger"
        onClick={() => this.props.onDelete(movie._id)}
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { moviesList, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        data={moviesList}
      />
    );
  }
}
