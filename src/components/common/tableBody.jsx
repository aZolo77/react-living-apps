// libraries
import React, { Component } from 'react';
import _ from 'lodash';

// components

export default class TableBody extends Component {
  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => {
          return (
            <tr key={item._id}>
              {columns.map(column => (
                <td key={this.createKey(item, column)}>
                  {this.renderCell(item, column)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  }

  // condition of how to render items
  renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    } else {
      return _.get(item, column.path);
    }
  };

  // create unique key for map-method
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
}
