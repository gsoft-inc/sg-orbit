import { DateRangePicker } from "../../../src";
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
            <div className="flex">
                <div className="mr4" style={{ width: "50%" }}>
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onDatesChange={this.handleDateChange}
                    />
                </div>
                <div style={{ width: "50%" }}>
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onDatesChange={this.handleDateChange}
                    />
                </div>
            </div>
        );
    }
}
