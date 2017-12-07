import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { comparableAttributes } from '../lib/attributes.js';
import './ComparableSelect.css';

export const initialComparableKey = comparableAttributes[0].attribute;

export const getSingleName = (attribute) => {
  const comparable = comparableAttributes.find(c => c.attribute === attribute);
  return comparable ? comparable.singleName : null;
}

export default class ComparableSelect extends Component {
  handleChange = event => this.props.onChange(event.currentTarget.value);

  render() {
    const { comparableKey, disabled } = this.props;

    return (
      <FormGroup controlId="comparableSelect" className="ComparableSelect">
        <ControlLabel>Compare</ControlLabel>
        <FormControl
          componentClass="select"
          placeholder="select"
          value={comparableKey}
          onChange={this.handleChange}
          disabled={disabled}
        >
          {comparableAttributes.map(({ collectionName, attribute }) =>
            <option value={attribute} key={attribute}>{collectionName}</option>)}
        </FormControl>
      </FormGroup>
    );
  }
}
