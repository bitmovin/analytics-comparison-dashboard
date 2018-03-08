import React from 'react';
import RemoveButton from './RemoveButton.js';
import { getSingleName } from './ComparableSelect.js';
import { attributeValue } from '../lib/helpers.js';

export default ({ columnKey, comparableKey, onRemove }) => {
  const comparableName = getSingleName(comparableKey);

  return (
    <th>
      <div className="headerContainer">
        <RemoveButton
          id={`${columnKey}ColumnRemoveButton`}
          tooltip={`Remove this ${comparableName}.`}
          onClick={onRemove}
        />
        {attributeValue(comparableKey, columnKey)}
      </div>
    </th>
  );
}
