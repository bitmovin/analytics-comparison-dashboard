import React from 'react';
import RemoveButton from './RemoveButton.js';
import { getSingleName } from './ComparableSelect.js';

export default ({ columnConfig, comparableKey, onRemove, index }) => {
  const comparableName = getSingleName(comparableKey);
  const isNotRemovable = comparableKey === 'PERIOD' && index === 0;

  return (
    <th>
      <div className="headerContainer">
        <RemoveButton
          id={`${columnConfig.key}ColumnRemoveButton`}
          tooltip={`Remove this ${comparableName}.`}
          onClick={onRemove}
          disabled={isNotRemovable}
        />
        {columnConfig.label}
      </div>
    </th>
  );
}
