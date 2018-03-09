import ColumnConfig from './ColumnConfig.js';

export default class PeriodColumnConfig extends ColumnConfig {
  constructor({ from, to }) {
    const key = [from, to].map(date => date.toISOString().slice(0, 10)).join(' – ');
    super({ key })
  }
}
