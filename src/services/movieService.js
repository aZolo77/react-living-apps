import http from './httpService';
import { apiUrl } from '../config.json';
// import getGenres from './genreService';

const apiEndpoint = `${apiUrl}/movies`;

function constractMovieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(id) {
  return http.delete(constractMovieUrl(id));
}

export function getMovie(id) {
  return http.get(constractMovieUrl(id));
}

export function saveMovie(movie) {
  const { _id } = movie;
  if (_id) {
    // update existing movie
    const body = { ...movie };
    delete body._id;
    return http.put(constractMovieUrl(_id), body);
  }

  // create new movie
  return http.post(apiEndpoint, movie);
}
