import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

export default ({ comparableName, columnKey, onChange, options }) => {
  return (
    <FormGroup controlId="addColumnSelect">
      <FormControl
        componentClass="select"
        placeholder={comparableName}
        value={columnKey}
        onChange={onChange}
      >
        {options.map(({ key, name }) =>
          <option value={key} key={key}>{name}</option>
        )}
      </FormControl>
    </FormGroup>
  )
}
