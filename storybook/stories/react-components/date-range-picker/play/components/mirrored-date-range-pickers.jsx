import { DateRangePicker } from "@orbit-ui/react-components";
import { PureComponent } from "react";

export class MirroredDateRangePickers extends PureComponent {
    state = {
        startDate: null,
        endDate: null
    };

    handleDatesChange = (event, startDate, endDate) => {
        const { onDatesChange } = this.props;

        this.setState({ startDate, endDate });
        onDatesChange(event, startDate, endDate);
    };

    render() {
        const { startDate, endDate } = this.state;

        return (
            <div className="flex">
                <div className="mr4" style={{ width: "50%" }}>
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onDatesChange={this.handleDatesChange}
                    />
                </div>
                <div style={{ width: "50%" }}>
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onDatesChange={this.handleDatesChange}
                    />
                </div>
            </div>
        );
    }
}
