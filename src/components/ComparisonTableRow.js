import React, { Component } from 'react';
import AmountCell from './AmountCell.js';
import LowestAmountCell from './LowestAmountCell.js';
import TimeCell from './TimeCell.js';
import HighestTimeCell from './HighestTimeCell.js';
import BitrateCell from './BitrateCell.js';
import FactorCell from './FactorCell.js';
import PercentageCell from './PercentageCell.js';
import ComparisonTableRowLabel from './ComparisonTableRowLabel.js';

const cellTypes = {
  amount: AmountCell,
  lowestAmount: LowestAmountCell,
  time: TimeCell,
  highestTime: HighestTimeCell,
  bitrate: BitrateCell,
  factor: FactorCell,
  percentage: PercentageCell,
};

export default class ComparisonTableRow extends Component {
  state = {
    values: [],
  }

  componentDidMount() {
    this.fetchAnalytics(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ values: [] });
    this.fetchAnalytics(newProps);
  }

  fetchQueryResult = async ({ query, columnConfig, queryBuilder }) => {
    const { aggregation, dimension, aggregationParam, licenseKey, fromDate, toDate,
      comparableKey, filters } = query;

    let baseQuery = queryBuilder[aggregation](dimension, aggregationParam)
      .licenseKey(licenseKey)

    switch(comparableKey) {
      case 'PERIOD':
        baseQuery = baseQuery.between(columnConfig.from, columnConfig.to);
        break;
      default:
        baseQuery = baseQuery
          .between(fromDate, toDate)
          .filter(comparableKey, 'EQ', columnConfig.key);
    }

    const filteredQuery = filters.reduce((q, filterParams) => q.filter(...filterParams), baseQuery);
    const { rows } = await filteredQuery.query();

    return rows[0] ? rows[0][0] : null;
  }

  resolveQuery = async ({ columnConfig, query, queryBuilder }) => {
    const { combineQueries, queries, filters } = query;

    if (combineQueries) {
      const runningQueries = queries
        .map(subQuery => ({ ...query, ...subQuery, filters: [...filters, ...(subQuery.filters || [])] }))
        .map(subQuery => this.fetchQueryResult({ query: subQuery, columnConfig, queryBuilder }));
      const results = await Promise.all(runningQueries);

      return combineQueries(...results)
    }

    return await this.fetchQueryResult({ query, columnConfig, queryBuilder });
  }

  fetchAnalytics = async ({ query, columnConfigs, queryBuilder }) => {
      const runningQueries = columnConfigs
        .map(columnConfig => this.resolveQuery({ columnConfig, query, queryBuilder }));

      const values = await Promise.all(runningQueries);

      this.setState({ values });
    }

  render() {
    const { columnConfigs, query } = this.props;
    const { values } = this.state;
    const isLoading = values.length !== columnConfigs.length;

    const sortedValues = values.filter(v => v !== null).sort((a, b) => a - b);
    const [lowestValue, ...highestValues] = sortedValues;
    const [highestValue,] = highestValues.reverse();

    return (
      <tr className="ComparisonTableRow">
        <td >
          <ComparisonTableRowLabel info={query.info}>{query.label}</ComparisonTableRowLabel>
        </td>
        {columnConfigs.map(({ key }, index) =>
          React.createElement(
            cellTypes[query.type],
            { key, value: values[index], loading: isLoading, highestValue, lowestValue }
          )
        )}
        <td></td>
      </tr>
    );
  }
}
