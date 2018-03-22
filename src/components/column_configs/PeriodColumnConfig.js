import ColumnConfig from './ColumnConfig.js';

export default class PeriodColumnConfig extends ColumnConfig {
  constructor({ from, to }) {
    const key = Math.random().toString(36).substr(2, 9);;
    super({ key })
    this.from = from;
    this.to = to;
  }

  get label() {
    return [this.from, this.to]
      .map(date => date.toLocaleDateString({ day: 'numeric', month: 'numeric'})).join(' – ');
  }
}
