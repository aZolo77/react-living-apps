import React, { Component, Fragment } from 'react';

export default class Counter extends Component {
  // Raised only One Time after first Rendering
  componentDidMount = () => {
    // console.log('App - Mounted');
  };

  // Can be raised several Times after Rendering
  componentDidUpdate = (prevProps, prevState) => {
    // console.log(prevProps, prevState);
  };

  // Raised One Time Before Component is Removed from the DOM
  componentWillUnmount = () => {
    console.log('Counter - Unmount');
  };

  render() {
    const {
      onDelete,
      counter,
      children,
      onDicrement,
      onIncrement
    } = this.props;

    return (
      <Fragment>
        {children}
        <div className="row">
          <div className="col-1">
            <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
          </div>
          <div className="col">
            {/* == Decrement btn == */}
            <button
              onClick={() => onDicrement(counter)}
              className="ml-2 btn btn-outline-secondary btn-lg"
              disabled={counter.value === 0 ? true : false}
            >
              -
            </button>
            {/* == Encrement btn == */}
            <button
              onClick={() => onIncrement(counter)}
              className="ml-2 btn btn-outline-success btn-lg"
            >
              +
            </button>
            {/* == Delete btn == */}
            <button
              className="ml-2 btn btn-danger btn-lg"
              onClick={() => onDelete(counter.id)}
            >
              x
            </button>
          </div>
        </div>
      </Fragment>
    );
  }

  getBadgeClasses = () => {
    const { value } = this.props.counter;
    let badgeClass = 'badge badge-';
    if (value === 0) {
      badgeClass += 'warning';
    } else if (value > 0) {
      badgeClass += 'primary';
    } else {
      badgeClass += 'danger';
    }

    return badgeClass;
  };

  formatCount = () => {
    const { value } = this.props.counter;
    return value === 0 ? 'Zero' : value;
  };
}
