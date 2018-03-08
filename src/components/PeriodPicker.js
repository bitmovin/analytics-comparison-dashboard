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

  onChange = ({ fromDate, toDate, label }) => {
    this.props.onChange({ fromDate, toDate });
    const currentLabel = label || `${moment(fromDate).format('L')} – ${moment(toDate).format('L')}`;
    this.setState({ currentLabel });
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
          onChange={this.onChange}
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
