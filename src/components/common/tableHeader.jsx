// libraries
import React, { Component } from 'react';

export default class TableHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column.path || column.key}
              scope="col"
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  // rendering sorting icons
  renderSortIcon = column => {
    const { path, order } = this.props.sortColumn;
    if (column.path !== path) return null;

    if (order === 'asc') return <i className="fa fa-sort-asc ml-2" />;

    return <i className="fa fa-sort-desc ml-2" />;
  };

  // Raising Methods Result to Parents Component Method
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };
}
