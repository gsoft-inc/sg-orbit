import { DateRangePicker } from "../src";
import React, { PureComponent } from "react";

export class DualControlledPickers extends PureComponent {
    state = {
        startDate: this.props.startDate,
        endDate: this.props.endDate
    };

    handleDateChange = (event, startDate, endDate, preset) => {
        const { logDatesChanged } = this.props;

        this.setState({ startDate, endDate })

        logDatesChanged(event, startDate, endDate, preset);
    };

    render() {
        const { startDate, endDate } = this.state;

        return (
            <>
                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onDatesChange={this.handleDateChange}
                />
                <br />
                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onDatesChange={this.handleDateChange}
                />
            </>
        );
    }
}
