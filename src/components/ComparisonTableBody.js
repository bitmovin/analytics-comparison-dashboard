import React from 'react';
import ComparisonTableRow from './ComparisonTableRow.js';
import './ComparisonTableBody.css';

export default function ComparisonTableBody(props) {
  const { selectedColumnKeys, fromDate, toDate, licenseKey, queryBuilder, comparableKey,
    filters, groupLabel, queries } = props;
  const filteredQueries = queries.map(q => ({ ...q, filters: [...q.filters, ...filters] }));

  return (
    <tbody className="ComparisonTableBody">
      <tr className="ComparisonTableBody-groupLabel">
        <td colSpan={2 + selectedColumnKeys.length}>{groupLabel}</td>
      </tr>
      {filteredQueries.map(q =>
        <ComparisonTableRow
          key={q.label}
          query={{ ...q, fromDate, toDate, licenseKey, comparableKey }}
          columnKeys={selectedColumnKeys}
          queryBuilder={queryBuilder}
        />
      )}
    </tbody>
  )
}
