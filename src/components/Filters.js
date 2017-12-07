import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Filter from './Filter.js'
import { allAttributes } from '../lib/attributes.js';
import './Filters.css';

export default function Filters ({ onAdd, onUpdate, onRemove, filters, queryBuilder, licenseKey, fromDate, toDate }) {
  const updateFilter = (attribute) => (value) => onUpdate({ attribute, value });
  const removeFilter = (attribute) => () => onRemove(attribute);
  const existingFilterNames = filters.map(f => f.attribute);
  const unusedFilterItems = allAttributes.filter(i => !existingFilterNames.includes(i.attribute));
  const noMoreFilters = unusedFilterItems.length === 0;

  return (
    <div className="Filters">
      <h2>Filters</h2>
      <div className="Filters-box">
        <DropdownButton title={'Add a filter'} onSelect={onAdd} id="addFilter" disabled={noMoreFilters}>
          {unusedFilterItems.map(({ attribute, singleName }) =>
            <MenuItem key={attribute} eventKey={attribute}>{singleName}</MenuItem>)}
        </DropdownButton>
        <div className="Filters-list">
          {filters.map(filter =>
            <Filter {...filter}
              key={filter.attribute}
              queryBuilder={queryBuilder}
              licenseKey={licenseKey}
              fromDate={fromDate}
              toDate={toDate}
              onChange={updateFilter(filter.attribute)}
              onRemove={removeFilter(filter.attribute)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
