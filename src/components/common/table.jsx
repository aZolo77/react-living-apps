// libraries
import React from 'react';

// components
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({ data, onSort, sortColumn, columns }) => {
  return (
    <table className="table">
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
