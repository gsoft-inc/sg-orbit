import { DateRangePicker } from "../../src";
import { noop } from "lodash";
import React, { PureComponent } from "react";

export class MirroredDateRangePickers extends PureComponent {
    state = {
        startDate: null,
        endDate: null
    };

    handleDateChange = (event, startDate, endDate) => {
        this.setState({ startDate, endDate })
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
                <br /><br />
                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onDatesChange={this.handleDateChange}
                />
            </>
        );
    }
}
