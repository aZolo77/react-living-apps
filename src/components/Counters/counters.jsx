// libraries
import React, { Component, Fragment } from 'react';

// components
import Counter from '../Counter/counter';

export default class Counters extends Component {
  render() {
    const {
      counters,
      onReset,
      onDelete,
      onIncrement,
      onDicrement
    } = this.props;

    return (
      <div className="container mt-4">
        {this.showReset(counters, onReset)}
        <hr />
        {counters.map(counter => (
          <Fragment key={counter.id}>
            <Counter
              counter={counter}
              onDelete={onDelete}
              onDicrement={onDicrement}
              onIncrement={onIncrement}
            >
              <h4>Counter #{counter.id}</h4>
            </Counter>
            <br />
            <hr />
          </Fragment>
        ))}
      </div>
    );
  }

  showReset = (counters, onReset) => {
    if (counters.length === 0) {
      return <p>This List is empty</p>;
    } else {
      return (
        <button className="btn btn-outline-info btn-large" onClick={onReset}>
          Reset
        </button>
      );
    }
  };
}
