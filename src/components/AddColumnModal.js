import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AddColumnSelect from './AddColumnSelect';

export default class AddColumnModal extends Component {
  state = {
    columnKey: '',
  }

  componentWillReceiveProps(newProps) {
    this.setDefaultColumnKey(newProps);
  }

  setDefaultColumnKey = ({ options }) => {
    const columnKey = options.length > 0 ? options[0].key : '';
    this.setState({ columnKey });
  }

  onChange = (event) => {
    this.setState({ columnKey: event.currentTarget.value });
  }

  handleSubmit = () => {
    this.props.onAdd(this.state.columnKey);
    this.props.onHide();
    this.setDefaultColumnKey(this.props);
  }

  render() {
    const { show, onHide, comparableName, options } = this.props;

    return (
      <Modal show={show} onHide={onHide} className="AddColumnModal">
        <Modal.Header closeButton>
          <Modal.Title>Add a {comparableName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddColumnSelect
            comparableName={comparableName}
            columnKey={this.state.columnKey}
            onChange={this.onChange}
            options={options}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.handleSubmit}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
