// libraries
import React, { Component } from 'react';
import Joi from 'joi-browser';

// components
import Input from '../common/input';
import Select from '../common/select';

// Logic-Component for Form-validation
export default class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  // Form Submit
  handleSubmit = ev => {
    ev.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  // Validate Form (onSubmit) with Joi Schema
  validate = () => {
    const { data } = this.state;
    const options = { abortEarly: false };

    const { error } = Joi.validate(data, this.schema, options);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  // Input Change
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    // set values depending on current target elements name
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  // Validate Input (onChange) with Joi Schema
  validateProperty = ({ name, value }) => {
    // validated object
    const fieldObj = { [name]: value };
    // schema to validate an obj
    const schema = { [name]: this.schema[name] };
    // options obj
    const options = { abortEarly: false };

    const { error } = Joi.validate(fieldObj, schema, options);

    return error ? error.details[0].message : null;
  };

  // Rendering Submit btn
  renderBtn = label => {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  };

  // Rendering Input
  renderInput = (name, label, type = 'text') => {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        handleChange={this.handleChange}
      />
    );
  };

  // Rendering Select Inp
  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        handleChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
}
