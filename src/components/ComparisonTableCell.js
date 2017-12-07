import React from 'react';
import './ComparisonTableCell.css';

const text = ({ loading, children, value }) => {
  if (loading) {
    return '⋯';
  }
  if (value) {
    return children;
  }
  return 'N/A';
}

const className = ({ value, loading, highestValue, lowestValue, best }) => {
  if (loading || !value) {
    return '';
  }

  switch (value) {
    case lowestValue:
      return best === 'lowest' ? 'best' : 'worst';
    case highestValue:
      return best === 'highest' ? 'best' : 'worst';
    default:
      return '';
  }
}

export default function ComparisonTableCell(props) {
  return (
    <td className={`ComparisonTableCell ${className(props)}`}>
      {text(props)}
    </td>
  )
}
