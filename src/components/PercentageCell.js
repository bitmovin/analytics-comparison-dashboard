import React from 'react';
import ComparisonTableCell from './ComparisonTableCell.js';

export default function PercentageCell(props) {
  return (
    <ComparisonTableCell {...props} best="lowest" className="PercentageCell">
      {(props.value * 100).toFixed()}%
    </ComparisonTableCell>
  );
}
