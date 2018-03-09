import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import ComparableSelect, { initialComparableKey, getSingleName } from './ComparableSelect.js';
import AddColumnButton from './AddColumnButton.js';
import ComparisonTableBody from './ComparisonTableBody.js';
import ComparisonTableHeader from './ComparisonTableHeader.js';
import { attributeValue, fetchAttributeRows } from '../lib/helpers.js';
import queryGroups from '../lib/queries.js';
import './ComparisonTable.css';

export default class ComparisonTable extends Component {
  state = {
    selectedColumnKeys: [],
    currentComparableKey: initialComparableKey,
    isLoading: true,
  }

  componentDidMount() {
    this.setInitialColumnKeys();
  }

  setInitialColumnKeys = async () => {
    const selectedColumnKeys = await this.initialColumnKeys(this.state.currentComparableKey)
    this.setState({ selectedColumnKeys, isLoading: false });
  }

  fetchAttributeValues = async (attribute) => {
    if (this.state.currentComparableKey === 'PERIOD') {
      return [];
    }
    const rows = await fetchAttributeRows({ ...this.props, attribute });
    return rows.sort((a, b) => b[1] - a[1]).map(row => row[0]);
  }

  columnKeys = () => {
    const { selectedColumnKeys, currentComparableKey } = this.state;
    switch (currentComparableKey) {
      case 'PERIOD': {
        const { fromDate, toDate } = this.props;
        const mainPeriodKey = [fromDate, toDate]
          .map(date => date.toISOString().slice(0, 10)).join(' – ');
        return [mainPeriodKey, ...selectedColumnKeys];
      }
      default: return selectedColumnKeys;
    }
  }

  initialColumnKeys = async (comparableKey) => {
    switch(comparableKey) {
      case 'PERIOD': {
        const periodString = (from, to) =>
          [from, to].map(date => date.toISOString().slice(0, 10)).join(' – ');
        const { fromDate, toDate } = this.props;
        const secondPeriodFromDate = new Date(fromDate - (toDate - fromDate));
        return [periodString(secondPeriodFromDate, fromDate)];
      }
      default: {
        const values = await this.fetchAttributeValues(comparableKey);
        return values.slice(0, 3);
      }
    }
  }

  addColumn = (key) => {
    const selectedColumnKeys = [...this.state.selectedColumnKeys, key];
    this.setState({ selectedColumnKeys });
  }

  handleComparableKeyChange = async (currentComparableKey) => {
    this.setState({ isLoading: true });
    const selectedColumnKeys = await this.initialColumnKeys(currentComparableKey)
    this.setState({ currentComparableKey, selectedColumnKeys, isLoading: false });
  }

  removeColumn = (columnKey) => () => {
    const selectedColumnKeys = this.state.selectedColumnKeys.filter(c => c !== columnKey);
    this.setState({ selectedColumnKeys });
  }

  addColumnOptions = async () => {
    const { currentComparableKey } = this.state;
    const values = await this.fetchAttributeValues(currentComparableKey);
    return values.map(key => ({ key, name: attributeValue(currentComparableKey, key) }));
  }

  availableAddColumnOptions = async () => {
    const { selectedColumnKeys } = this.state;
    const options = await this.addColumnOptions();
    return options.filter(o => !selectedColumnKeys.includes(o.key))
  }

  render() {
    const { fromDate, toDate, licenseKey, queryBuilder, filters } = this.props;
    const { currentComparableKey, isLoading } = this.state;
    const comparableName = getSingleName(currentComparableKey);
    const addType = currentComparableKey === 'PERIOD' ? 'period' : 'list';

    return (
      <div className="ComparisonTable">
        <Table className={isLoading && 'isLoading'}>
          <thead>
            <tr>
              <th>
                <ComparableSelect
                  comparableKey={currentComparableKey}
                  onChange={this.handleComparableKeyChange}
                  disabled={isLoading}
                />
              </th>
              {this.columnKeys().map((columnKey, index) =>
                <ComparisonTableHeader
                  key={`header-${columnKey}`}
                  columnKey={columnKey}
                  comparableKey={currentComparableKey}
                  onRemove={this.removeColumn(columnKey)}
                  index={index}
                />
              )}
              <th>
                <AddColumnButton
                  comparableName={comparableName}
                  onAdd={this.addColumn}
                  disabled={isLoading}
                  optionsPromise={this.availableAddColumnOptions()}
                  type={addType}
                />
              </th>
            </tr>
          </thead>
          {queryGroups.map(({ label, queries }) =>
            <ComparisonTableBody
              key={label}
              selectedColumnKeys={this.columnKeys()}
              comparableKey={currentComparableKey}
              fromDate={fromDate}
              toDate={toDate}
              licenseKey={licenseKey}
              queryBuilder={queryBuilder}
              queries={queries}
              groupLabel={label}
              filters={filters}
            />
          )}
        </Table>
      </div>
    );
  }
}
