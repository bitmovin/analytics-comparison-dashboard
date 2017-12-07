import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import RemoveButton from './RemoveButton.js';
import { allAttributes } from '../lib/attributes.js';
import { attributeValue, fetchAttributeRows } from '../lib/helpers.js';
import './Filter.css';

export default class Filter extends Component {
  state = {
    isLoading: true,
    filterOptions: [],
  };

  constructor(props) {
    super();
    this.fetchFilterOptions(props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.fromDate !== this.props.fromDate || newProps.toDate !== this.props.toDate) {
      this.setState({ isLoading: true });
      this.fetchFilterOptions(newProps);
    }
  }

  fetchFilterOptions = async ({ queryBuilder, licenseKey, fromDate, toDate, attribute }) => {
    const attributeRows = await fetchAttributeRows({ queryBuilder, licenseKey, fromDate, toDate, attribute })
    const filterOptions = attributeRows
      .sort((a, b) => b[1] - a[1])
      .map(r => r[0]);
    this.setState({ filterOptions, isLoading: false });
    this.props.onChange(filterOptions[0]);
  };

  handleChange = (event) => {
    this.props.onChange(event.currentTarget.value);
  };

  render() {
    const { attribute, value, onRemove } = this.props;
    const { filterOptions, isLoading } = this.state;
    const label = allAttributes.find(a => a.attribute === attribute).singleName;

    return (
      <FormGroup controlId={`${attribute}Filter`} className="Filter"  bsSize="small">
        <RemoveButton
          onClick={onRemove}
          tooltip="Remove this filter."
          id={`${attribute}FilterRemoveButton`}
        />
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          componentClass="select"
          placeholder="select"
          value={value || filterOptions[0] || ''}
          onChange={this.handleChange}
          disabled={isLoading}
        >
          {filterOptions.map((option) =>
            <option value={option} key={option}>{attributeValue(attribute, option)}</option>)}
        </FormControl>
      </FormGroup>
    )
  }
}
