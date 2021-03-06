import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import ComparableSelect, { initialComparableKey } from './ComparableSelect.js';
import AddColumnButton from './AddColumnButton.js';
import ComparisonTableBody from './ComparisonTableBody.js';
import ComparisonTableHeader from './ComparisonTableHeader.js';
import ColumnConfig from './column_configs/ColumnConfig.js';
import PeriodColumnConfig from './column_configs/PeriodColumnConfig.js';
import { fetchAttributeRows } from '../lib/helpers.js';
import queryGroups from '../lib/queries.js';
import './ComparisonTable.css';

export default class ComparisonTable extends Component {
  state = {
    selectedColumnConfigs: [],
    currentComparableKey: initialComparableKey,
    isLoading: true,
  }

  componentDidMount() {
    this.setInitialColumnConfigs();
  }

  setInitialColumnConfigs = async () => {
    const selectedColumnConfigs = await this.initialColumnConfigs(this.state.currentComparableKey)
    this.setState({ selectedColumnConfigs, isLoading: false });
  }

  fetchAttributeValues = async (attribute) => {
    if (attribute === 'PERIOD') {
      return [];
    }
    const rows = await fetchAttributeRows({ ...this.props, attribute });
    return rows.sort((a, b) => b[1] - a[1]).map(row => row[0]);
  }

  columnConfigs = () => {
    const { selectedColumnConfigs, currentComparableKey } = this.state;
    switch (currentComparableKey) {
      case 'PERIOD': {
        const { fromDate, toDate } = this.props;
        const mainPeriodConfig = new PeriodColumnConfig({ from: fromDate, to: toDate });
        return [mainPeriodConfig, ...selectedColumnConfigs];
      }
      default: return selectedColumnConfigs;
    }
  }

  initialColumnConfigs = async (comparableKey) => {
    switch(comparableKey) {
      case 'PERIOD': {
        const { fromDate, toDate } = this.props;
        const secondPeriodFromDate = new Date(fromDate - (toDate - fromDate));
        return [new PeriodColumnConfig({ from: secondPeriodFromDate, to: fromDate })];
      }
      default: {
        const values = await this.fetchAttributeValues(comparableKey);
        return values.slice(0, 3).map(key => new ColumnConfig.for(comparableKey, { key }));
      }
    }
  }

  addColumn = (config) => {
    const selectedColumnConfigs = [...this.state.selectedColumnConfigs, config];
    this.setState({ selectedColumnConfigs });
  }

  handleComparableKeyChange = async (currentComparableKey) => {
    this.setState({ isLoading: true });
    const selectedColumnConfigs = await this.initialColumnConfigs(currentComparableKey);
    this.setState({ currentComparableKey, selectedColumnConfigs, isLoading: false });
  }

  removeColumn = (columnKey) => () => {
    const selectedColumnConfigs = this.state.selectedColumnConfigs.filter(c => c.key !== columnKey);
    this.setState({ selectedColumnConfigs });
  }

  addColumnOptions = async () => {
    const { currentComparableKey } = this.state;
    const values = await this.fetchAttributeValues(currentComparableKey);
    return values.map(key => ColumnConfig.for(currentComparableKey, { key }));
  }

  availableAddColumnOptions = async () => {
    const { selectedColumnConfigs } = this.state;
    const options = await this.addColumnOptions();
    return options.filter(o => !selectedColumnConfigs.map(c => c.key).includes(o.key))
  }

  render() {
    const { fromDate, toDate, licenseKey, queryBuilder, filters } = this.props;
    const { currentComparableKey, isLoading } = this.state;

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
              {this.columnConfigs().map((columnConfig, index) =>
                <ComparisonTableHeader
                  key={`header-${columnConfig.key}`}
                  columnConfig={columnConfig}
                  comparableKey={currentComparableKey}
                  onRemove={this.removeColumn(columnConfig.key)}
                  index={index}
                />
              )}
              <th>
                <AddColumnButton
                  comparableKey={currentComparableKey}
                  onAdd={this.addColumn}
                  disabled={isLoading}
                  optionsPromise={this.availableAddColumnOptions()}
                />
              </th>
            </tr>
          </thead>
          {queryGroups.map(({ label, queries }) =>
            <ComparisonTableBody
              key={label}
              selectedColumnConfigs={this.columnConfigs()}
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
