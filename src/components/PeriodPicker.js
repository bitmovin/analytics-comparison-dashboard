import React, { Component } from 'react';
import { Button, OverlayTrigger, Popover }
  from 'react-bootstrap';
import moment from 'moment';
import PeriodSelection, { periods } from './PeriodSelection';
import 'react-datepicker/dist/react-datepicker.css';
import './PeriodPicker.css';

export const initialPeriod = periods[2];

export default class PeriodPicker extends Component {
  state = {
    currentLabel: initialPeriod.label,
  }

  handleDateChange = (attr) => (dateMoment) => {
    const { fromDate, toDate, onChange } = this.props;
    const update = { [attr]: dateMoment.toDate() };
    onChange({ fromDate, toDate, ...update });
    this.setState({ currentLabel: `${moment(fromDate).format('L')} – ${moment(toDate).format('L')}`})
  }

  selectRange = (label) => {
    const range = periods.find(r => r.label === label);
    this.props.onChange({ fromDate: range.fromDate(), toDate: range.toDate() });
    this.setState({ currentLabel: range.label });
  }

  render() {
    const { fromDate, toDate } = this.props;
    const { currentLabel } = this.state;

    const periodPopover = (
      <Popover id="PeriodPicker" className="PeriodPicker">
        <PeriodSelection
          fromDate={fromDate}
          toDate={toDate}
          currentLabel={currentLabel}
          onFromDateChange={this.handleDateChange('fromDate')}
          onToDateChange={this.handleDateChange('toDate')}
          selectRange={this.selectRange}
        />
      </Popover>
    );

    return (
      <div>
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={periodPopover}>
          <Button>{currentLabel}</Button>
        </OverlayTrigger>
      </div>
    );
  }
}
