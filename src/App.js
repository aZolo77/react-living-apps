// libraries
import React, { Component, Fragment } from 'react';

// components
// import Movies from './components/Movies/movies';
import Counters from './components/Counters/counters';
import Navbar from './components/Navbar/navbar';

// styles
import './App.css';

export default class App extends Component {
  state = {
    // {Single Saurse of Truth} (SST)
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 2 },
      { id: 5, value: 1 }
    ]
  };

  render() {
    return (
      <Fragment>
        <Navbar
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container">
          <Counters
            onReset={this.handleReset}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            onDicrement={this.handleDicrement}
            counters={this.state.counters}
          />
        </main>
      </Fragment>
    );
  }

  // Delete Counter
  handleDelete = counterId => {
    const counters = this.state.counters.filter(
      counter => counter.id !== counterId
    );
    this.setState({ counters });
  };

  // Reset counters
  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  // Increment counter
  handleIncrement = counter => {
    // clone the whole array
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);

    // clone one object
    counters[index] = { ...counter };
    counters[index].value++;

    // update {State}
    this.setState({ counters });
  };

  // Decrement counter
  handleDicrement = ({ id, value }) => {
    if (value === 0) return false;
    const counters = this.state.counters.map(c => {
      if (c.id === id) {
        c.value = c.value - 1;
      }
      return c;
    });
    this.setState({ counters });
  };
}
