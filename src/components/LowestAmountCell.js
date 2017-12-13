import React from 'react';
import ComparisonTableCell from './ComparisonTableCell.js';

export default function LowestAmountCell(props) {
  return (
    <ComparisonTableCell {...props} best="lowest" className="AmountCell">
      {props.value}
    </ComparisonTableCell>
  );
}
