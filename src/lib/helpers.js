export const fetchAttributeRows = async ({ queryBuilder, licenseKey, fromDate, toDate, attribute }) => {
  const { rows } = await queryBuilder
    .count('IMPRESSION_ID')
    .licenseKey(licenseKey)
    .between(fromDate, toDate)
    .groupBy(attribute)
    .query();
  return rows.filter(r => r[0] !== null);
}
