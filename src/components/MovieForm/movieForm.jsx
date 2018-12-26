// libraries
import React from 'react';
import Joi from 'joi-browser';

// components
import Form from '../common/form';

// services
import { getGenres } from '../../services/genreService';
import { getMovie, saveMovie } from '../../services/movieService';
import { toast } from 'react-toastify';

export default class MovieForm extends Form {
  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    errors: {}
  };

  // Joi validation schema
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label('Title'),
    genreId: Joi.string()
      .required()
      .label('Genre'),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label('Number in Stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate')
  };

  componentDidMount = async () => {
    await this.populateGenres();
    await this.populateMovie();
  };

  render() {
    return (
      <div>
        <h3>
          Movie Form:{' '}
          <mark>
            {this.state.data.title ? this.state.data.title : 'New Movie'}
          </mark>
        </h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderBtn('Save')}
        </form>
      </div>
    );
  }

  // populating State with available Genres
  populateGenres = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  };

  // populating State with a movie Data
  populateMovie = async () => {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === 'new') return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace('/not-found');
      }
    }
  };

  // preparing movie schema
  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  // save New Movie or change old movie data
  doSubmit = async () => {
    try {
      await saveMovie(this.state.data);
      this.props.history.push('/movies');
      toast.success('Movie has been added or updated');
    } catch (ex) {
      toast.error('Sorry! Something went wrong');
      console.log(ex);
    }
  };
}
