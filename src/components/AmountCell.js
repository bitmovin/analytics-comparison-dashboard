import React from 'react';
import ComparisonTableCell from './ComparisonTableCell.js';

export default function AmountCell(props) {
  const attrs = { best: 'highest', ...props }
  return (
    <ComparisonTableCell {...attrs} className="AmountCell">
      {props.value}
    </ComparisonTableCell>
  );
}
