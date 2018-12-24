import React from 'react';

const Input = ({ name, label, handleChange, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        name={name}
        placeholder=""
        id={name}
        onChange={handleChange}
        {...rest}
      />
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Input;
