import ColumnConfig from './ColumnConfig.js';

export default class PeriodColumnConfig extends ColumnConfig {
  get label() {
    return this.key ? 'True' : 'False';
  }
}
