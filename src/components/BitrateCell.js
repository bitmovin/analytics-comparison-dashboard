import React from 'react';
import ComparisonTableCell from './ComparisonTableCell.js';

export default function BitrateCell(props) {
  const val = ((props.value || 0) / 2 ** 20).toFixed(2)
  return (
    <ComparisonTableCell {...props} best="highest" className="BitrateCell">
      {val} Mbit
    </ComparisonTableCell>
  );
}
