// libraries
import React, { Component } from 'react';

// components
import Like from '../common/like';
import Pagination from '../common/pagination';
import ListGroup from '../common/listGroup';

// services
import { getMovies } from '../../services/fakeMovieService';
import { getGenres } from '../../services/fakeGenreService';
import { paginate } from '../../utils/paginate';

// styles
import './movies.css';

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null
  };

  componentDidMount = () => {
    const genres = [{ name: 'All Genres' }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres
    });
  };

  render() {
    const { length: moviesCount } = this.state.movies;
    const { movies, currentPage, pageSize, genres, selectedGenre } = this.state;

    // if Movies are filtered by Genre
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;

    const moviesList = paginate(filtered, currentPage, pageSize);

    return (
      <div className="container">
        {moviesCount === 0 ? (
          <div className="jumbotron">
            <p>Movie List is empty</p>
          </div>
        ) : (
          <div className="row mt-4">
            <div className="col-3">
              <ListGroup
                items={genres}
                onItemSelect={this.handleGenreSelect}
                selectedItem={selectedGenre}
              />
            </div>
            <div className="col-9">
              <p>
                Showing <b>{filtered.length}</b> movies in the List
              </p>
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
                <tbody>
                  {moviesList.map(movie => {
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
                  })}
                </tbody>
              </table>
              <Pagination
                itemsCount={filtered.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Filter Movies List by Genre
  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  // Paginate through pages
  handlePageChange = page => {
    this.setState({ currentPage: page });
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
