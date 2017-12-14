import React, { Component } from 'react';
import AmountCell from '../components/AmountCell.js';
import LowestAmountCell from '../components/LowestAmountCell.js';
import TimeCell from '../components/TimeCell.js';
import HighTimeCell from '../components/HighTimeCell.js';
import RoundedCell from '../components/RoundedCell.js';
import BitrateCell from '../components/BitrateCell.js';
import FactorCell from '../components/FactorCell.js';
import PercentageCell from '../components/PercentageCell.js';

const cellTypes = {
  amount: AmountCell,
  lowestAmount: LowestAmountCell,
  time: TimeCell,
  hightime: HighTimeCell,
  rounded: RoundedCell,
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

  fetchQueryResult = async ({ query, columnKey, queryBuilder }) => {
    const { aggregation, dimension, aggregationParam, licenseKey, fromDate, toDate,
      comparableKey, filters } = query;

    const baseQuery = queryBuilder[aggregation](dimension, aggregationParam)
      .licenseKey(licenseKey)
      .between(fromDate, toDate)
      .filter(comparableKey, 'EQ', columnKey)
    const filteredQuery = filters.reduce((q, filterParams) => q.filter(...filterParams), baseQuery);
    const { rows } = await filteredQuery.query();

    return rows[0] ? rows[0][0] : null;
  }

  resolveQuery = async ({ columnKey, query, queryBuilder }) => {
    const { combineQueries, queries, filters } = query;

    if (combineQueries) {
      const runningQueries = queries
        .map(subQuery => ({ ...query, ...subQuery, filters: [...filters, ...(subQuery.filters || [])] }))
        .map(subQuery => this.fetchQueryResult({ query: subQuery, columnKey, queryBuilder }));
      const results = await Promise.all(runningQueries);

      return combineQueries(...results)
    }

    return await this.fetchQueryResult({ query, columnKey, queryBuilder });
  }

  fetchAnalytics = async ({ query, columnKeys, queryBuilder }) => {
      const runningQueries = columnKeys
        .map(columnKey => this.resolveQuery({ columnKey, query, queryBuilder }));

      const values = await Promise.all(runningQueries);

      this.setState({ values });
    }

  render() {
    const { columnKeys, query } = this.props;
    const { values } = this.state;
    const isLoading = values.length !== columnKeys.length;

    const sortedValues = values.filter(v => v !== null).sort((a, b) => a - b);
    const [lowestValue, ...highestValues] = sortedValues;
    const [highestValue,] = highestValues.reverse();

    return (
      <tr className="ComparisonTableRow">
        <td>{query.label}</td>
        {columnKeys.map((key, index) =>
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
