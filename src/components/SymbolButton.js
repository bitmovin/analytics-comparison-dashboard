import React from 'react';
import { OverlayTrigger, Button, Tooltip } from 'react-bootstrap';
import './SymbolButton.css';

export default function SymbolButton({ id, tooltip, children, className, ...buttonProps }) {
  const tooltipElement = (
    <Tooltip id={`${id}Tooltip`}>{tooltip}</Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={tooltipElement}>
      <Button {...buttonProps} bsSize="xsmall" className={`SymbolButton ${className}`}>
        {children}
      </Button>
    </OverlayTrigger>
  );
}
