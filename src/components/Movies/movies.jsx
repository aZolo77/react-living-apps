// libraries
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';

// components
import MoviesTable from '../MovieTable/moviesTable';
import Pagination from '../common/pagination';
import ListGroup from '../common/listGroup';
import SearchBox from '../SearchBox/searchBox';

// services
import { getMovies, deleteMovie } from '../../services/movieService';
import { getGenres } from '../../services/genreService';
import { paginate } from '../../utils/paginate';

// styles
import './movies.css';

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: '',
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount = async () => {
    const { data } = await getGenres();
    // console.log(data);

    const genres = [{ _id: '', name: 'All Genres' }, ...data];

    const { data: movies } = await getMovies();
    // console.log(movies.data);

    this.setState({
      movies,
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
      sortColumn,
      searchQuery
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
              <Link to="/movies/new" className="btn btn-primary mb-4">
                New Movie
              </Link>
              <p>
                Showing <b>{totalCount}</b> movies in the List
              </p>
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
      sortColumn,
      searchQuery
    } = this.state;

    // 1. Filtering
    let filtered = movies;
    if (searchQuery) {
      // by search query
      filtered = movies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      // by genre
      filtered = movies.filter(m => m.genre._id === selectedGenre._id);
    }

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
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: '' });
  };

  // Paginate through pages
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  // Search handler
  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
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
  handleDelete = async movieId => {
    const originalMovies = this.state.movies;

    const movies = originalMovies.filter(movie => movie._id !== movieId);
    this.setState({ movies });

    try {
      await deleteMovie(movieId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('This movie has already been deleted');
      }
      // undo changes
      this.setState({ movies: originalMovies });
    }
  };
}
