import countryList from 'country-list';
import ColumnConfig from './ColumnConfig.js';

const countries = countryList();

export default class PeriodColumnConfig extends ColumnConfig {
  get label() {
    return countries.getName(this.key) || 'Unknown';
  }
}
