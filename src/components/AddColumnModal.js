import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AddColumnSelect from './AddColumnSelect';
import PeriodSelection from './PeriodSelection';

export default class AddColumnModal extends Component {
  state = {
    columnKey: '',
    fromDate: null,
    toDate: null,
    periodLabel: null,
  }

  componentWillReceiveProps(newProps) {
    this.setDefaultColumnKey(newProps);
  }

  setDefaultColumnKey = ({ options }) => {
    const columnKey = options.length > 0 ? options[0].key : '';
    this.setState({ columnKey });
  }

  onSelectChange = (event) => {
    this.setState({ columnKey: event.currentTarget.value });
  }

  onPeriodChange = ({ fromDate, toDate, label }) => {
    const columnKey = [fromDate, toDate].map(date => date.toISOString().slice(0, 10)).join(' – ');
    this.setState({ fromDate, toDate, label, columnKey });
  }

  handleSubmit = () => {
    this.props.onAdd(this.state.columnKey);
    this.props.onHide();
    this.setDefaultColumnKey(this.props);
  }

  body = () => {
    const { type, comparableName, options } = this.props;

    switch(type) {
      case 'list': return (
        <AddColumnSelect
          comparableName={comparableName}
          columnKey={this.state.columnKey}
          onChange={this.onSelectChange}
          options={options}
        />
      );
      case 'period': return (
        <PeriodSelection
          onChange={this.onPeriodChange}
        />
      )
      default: throw new Error(`Unknown modal type: '${type}'`);
    }
  }

  render() {
    const { show, onHide, comparableName } = this.props;

    return (
      <Modal show={show} onHide={onHide} className="AddColumnModal">
        <Modal.Header closeButton>
          <Modal.Title>Add a {comparableName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.body()}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.handleSubmit}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
