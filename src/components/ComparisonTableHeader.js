import React from 'react';
import RemoveButton from './RemoveButton.js';
import { getSingleName } from './ComparableSelect.js';
import { attributeValue } from '../lib/helpers.js';

export default ({ columnKey, comparableKey, onRemove, index }) => {
  const comparableName = getSingleName(comparableKey);
  const isNotRemovable = comparableKey === 'PERIOD' && index === 0;

  return (
    <th>
      <div className="headerContainer">
        <RemoveButton
          id={`${columnKey}ColumnRemoveButton`}
          tooltip={`Remove this ${comparableName}.`}
          onClick={onRemove}
          disabled={isNotRemovable}
        />
        {attributeValue(comparableKey, columnKey)}
      </div>
    </th>
  );
}
