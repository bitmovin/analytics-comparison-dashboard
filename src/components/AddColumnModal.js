import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AddColumnSelect from './AddColumnSelect';
import PeriodSelection from './PeriodSelection';
import ColumnConfig from './column_configs/ColumnConfig';
import { getSingleName } from './ComparableSelect.js';

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
    const { comparableKey } = this.props;
    const { columnKey: key, fromDate: from, toDate: to } = this.state;
    const columnConfig = ColumnConfig.for(comparableKey, { key, from, to });
    this.props.onAdd(columnConfig);
    this.props.onHide();
    this.setDefaultColumnKey(this.props);
  }

  comparableName = () => getSingleName(this.props.comparableKey);

  body = () => {
    const { type, options } = this.props;

    switch(type) {
      case 'list': return (
        <AddColumnSelect
          comparableName={this.comparableName()}
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
    const { show, onHide } = this.props;

    return (
      <Modal show={show} onHide={onHide} className="AddColumnModal">
        <Modal.Header closeButton>
          <Modal.Title>Add a {this.comparableName()}</Modal.Title>
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
