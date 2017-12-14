import React from 'react';
import ComparisonTableCell from './ComparisonTableCell.js';

export default function TimeCell(props) {
  const attrs = { best: 'lowest', ...props };
  return (
    <ComparisonTableCell {...attrs} className="TimeCell">
      {(props.value / 1000).toFixed(2)}s
    </ComparisonTableCell>
  );
}
