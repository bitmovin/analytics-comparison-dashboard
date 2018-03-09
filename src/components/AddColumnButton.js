import React, { Component } from 'react';
import SymbolButton from './SymbolButton.js';
import AddColumnModal from './AddColumnModal.js';
import { getSingleName } from './ComparableSelect.js';

export default class AddColumnButton extends Component {
  state = {
    options: [],
    showAddColumnModal: false,
  }

  constructor(props) {
    super(props);
    this.awaitOptions(props.optionsPromise);
  }

  componentWillReceiveProps({ disabled, optionsPromise }) {
    if (!disabled) {
      this.awaitOptions(optionsPromise);
    }
  }

  awaitOptions = async (optionsPromise) => {
    const options = await optionsPromise;
    this.setState({ options });
  }

  handleAddButtonClick = () => {
    this.setState({ showAddColumnModal: true });
  }

  hideAddColumnModal = () => {
    this.setState({ showAddColumnModal: false });
  }

  render() {
    const { comparableKey, onAdd, disabled, type } = this.props;
    const { options, showAddColumnModal } = this.state;
    const noMoreOptions = type === 'list' && options.length === 0;
    const comparableName = getSingleName(comparableKey);

    return (
      <div className="AddColumnButton">
        <SymbolButton
          id="addColumn"
          tooltip={`Add another ${comparableName}.`}
          bsStyle="primary"
          disabled={noMoreOptions || disabled}
          onClick={this.handleAddButtonClick}
        >
          +
        </SymbolButton>
        <AddColumnModal
          onAdd={onAdd}
          show={showAddColumnModal}
          onHide={this.hideAddColumnModal}
          options={options}
          comparableKey={comparableKey}
          type={type}
        />
      </div>
    );
  }
}
