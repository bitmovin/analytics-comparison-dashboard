import React from 'react';
import ComparisonTableCell from './ComparisonTableCell.js';

export default function RoundedCell(props) {
  const val = (props.value || 0).toFixed(2)
  return (
    <ComparisonTableCell {...props} best="highest" className="AmountCell">
      {val}
    </ComparisonTableCell>
  );
}
