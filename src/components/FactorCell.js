import React from 'react';
import ComparisonTableCell from './ComparisonTableCell.js';

export default function FactorCell(props) {
  const val = (props.value || 0).toFixed(2)
  return (
    <ComparisonTableCell {...props} className="AmountCell">
      {val}
    </ComparisonTableCell>
  );
}
