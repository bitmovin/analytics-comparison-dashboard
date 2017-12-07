import React from 'react';
import ComparisonTableCell from './ComparisonTableCell.js';

export default function AmountCell(props) {
  return (
    <ComparisonTableCell {...props} best="highest" className="AmountCell">
      {props.value}
    </ComparisonTableCell>
  );
}
