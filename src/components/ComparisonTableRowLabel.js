import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import './ComparisonTableRowLabel.css';

export default function ComparisonTableRowLabel({ children, info }) {
  const label = (className) =>
    <span className={['ComparisonTableRowLabel', className].join(' ').trim()}>{children}</span>;

  if (!info) {
    return label();
  }

  const infoTooltip = <Tooltip id="ComparisonTableRowLabel-tooltip">{info}.</Tooltip>;

  return (
    <OverlayTrigger placement="right" overlay={infoTooltip}>
      {label('withInfo')}
    </OverlayTrigger>
  )
}
