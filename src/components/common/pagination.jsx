// libraries
import React, { Component } from 'react';
// {https://reactjs.org/docs/typechecking-with-proptypes.html}
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class Pagination extends Component {
  // checking properties Type
  static propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
  };

  render() {
    const { itemsCount, pageSize, currentPage, onPageChange } = this.props;

    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    // create an array LIKE [1, 2, 3] with {Lodash} library
    const pages = _.range(1, pagesCount + 1);

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map(page => (
            <li
              className={
                page === currentPage ? 'page-item active' : 'page-item'
              }
              key={page}
            >
              <span className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
