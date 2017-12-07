import React from 'react';
import SymbolButton from './SymbolButton.js';
import './RemoveButton.css';

export default function RemoveButton(props) {
  return (
    <SymbolButton className="RemoveButton" {...props}>
      –
    </SymbolButton>
  );
}
