import React from 'react';
import ComparisonTableCell from './ComparisonTableCell.js';

export default function HighTimeCell(props) {
  return (
    <ComparisonTableCell {...props} best="highest" className="TimeCell">
      {(props.value / 1000).toFixed(2)}s
    </ComparisonTableCell>
  );
}
