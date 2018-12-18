import React, { Component } from 'react';

export default class MovieForm extends Component {
  render() {
    const { match, history } = this.props;
    return (
      <div>
        <h3>Movie Form: {match.params.id}</h3>
        <button
          className="btn btn-success mt-3"
          onClick={() => history.push('/movies')}
        >
          Save
        </button>
      </div>
    );
  }
}
