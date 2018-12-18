// libraries
import React, { Component } from 'react';
import _ from 'lodash';

// components
import MoviesTable from '../MovieTable/moviesTable';
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
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount = () => {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres
    });
  };

  render() {
    const { length: moviesCount } = this.state.movies;

    const {
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    // get filtered, sorted and paginated Data
    const { totalCount, data } = this.getPagedData();

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
                Showing <b>{totalCount}</b> movies in the List
              </p>
              <MoviesTable
                moviesList={data}
                onLike={this.handleLikedClick}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
              <Pagination
                itemsCount={totalCount}
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

  // Filtering, Sorting and Paginating Data
  getPagedData = () => {
    const {
      movies,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn
    } = this.state;

    // 1. Filtering
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;

    // 2. Sorting (сортирует элементы массива по имени, передаваемому во втором аргументе)
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // 3. Paginating
    const moviesList = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: moviesList };
  };

  // Sort movies List
  handleSort = sortColumn => {
    this.setState({
      sortColumn
    });
  };

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
