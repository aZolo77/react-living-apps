// libraries
import React, { Component } from 'react';

// services
import { getMovies } from '../../services/fakeMovieService';
import Like from '../common/like';
import Pagination from '../common/pagination';

// styles
import './movies.css';

export default class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount = () => {
    this.setState({
      movies: getMovies()
    });
  };

  render() {
    // console.log(this.state.movies);

    const { length: moviesCount } = this.state.movies;
    const { pageSize, currentPage } = this.state;

    return (
      <div className="container">
        {moviesCount === 0 ? (
          <div className="jumbotron">
            <p>Movie List is empty</p>
          </div>
        ) : (
          <div className="row mt-4">
            <p>Showing {moviesCount} movies in the List</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th scope="col" />
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>{this.renderMoviesList()}</tbody>
            </table>
            <Pagination
              itemsCount={moviesCount}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
            />
          </div>
        )}
      </div>
    );
  }

  // Paginate through pages
  handlePageChange = page => {
    this.setState({ currentPage: page });
    console.log('Handle Page Change Func: ', page);
  };

  // Creating Movie List
  renderMoviesList = () => {
    const { movies } = this.state;
    return movies.map(movie => {
      return (
        <tr key={movie._id}>
          <th scope="row">{movie.title}</th>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td>
            {
              <Like
                liked={movie.liked}
                onLikeClick={() => this.handleLikedClick(movie)}
              />
            }
          </td>
          <td>
            <button
              className="btn btn-large btn-outline-danger"
              onClick={() => this.handleDelete(movie._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  // Handle Like
  handleLikedClick = movie => {
    // copy array of objects
    const movies = [...this.state.movies];

    // find movie index
    const index = movies.indexOf(movie);
    // change one property
    movies[index].liked = !movies[index].liked;

    // refresh {State}
    this.setState({ movies });
  };

  // Delet movie from the List
  handleDelete = movieId => {
    const movies = this.state.movies.filter(movie => movie._id !== movieId);
    this.setState({ movies });
  };
}
