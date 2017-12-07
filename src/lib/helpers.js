import countryList from 'country-list';

const countries = countryList();

export const attributeValue = (attribute, value) => {
  switch (attribute) {
    case 'COUNTRY':
      return countries.getName(value) || 'Unknown';
    default:
      return value || 'None';
  }
};

export const fetchAttributeRows = async ({ queryBuilder, licenseKey, fromDate, toDate, attribute }) => {
  const { rows } = await queryBuilder
    .count('IMPRESSION_ID')
    .licenseKey(licenseKey)
    .between(fromDate, toDate)
    .groupBy(attribute)
    .query();
  return rows.filter(r => r[0] !== null);
}
