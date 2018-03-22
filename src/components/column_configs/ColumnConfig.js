export default class ColumnConfig {
  constructor({ key }) {
    this.key = key;
  }

  get label() {
    return this.key || 'None';
  }

  static for(comparableKey, attrs) {
    switch (comparableKey) {
      case 'IS_LIVE': {
        const LiveColumnConfig = require('./LiveColumnConfig.js').default;
        return new LiveColumnConfig(attrs);
      }
      case 'COUNTRY': {
        const CountryColumnConfig = require('./CountryColumnConfig.js').default;
        return new CountryColumnConfig(attrs);
      }
      case 'PERIOD': {
        const PeriodColumnConfig = require('./PeriodColumnConfig.js').default;
        return new PeriodColumnConfig(attrs);
      }
      default: return new ColumnConfig(attrs);
    }
  }
}
