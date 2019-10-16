import { PureComponent } from "react";
import { SingleDatePicker } from "@orbit-ui/react-date-picker/src";

export class MirroredSingleDatePickers extends PureComponent {
    state = {
        date: null
    };

    handleDateChange = (event, date) => {
        const { onDateChange } = this.props;

        this.setState({ date });
        onDateChange(event, date);
    };

    render() {
        const { date } = this.state;

        return (
            <div className="flex">
                <div className="mr4" style={{ width: "50%" }}>
                    <SingleDatePicker
                        date={date}
                        onDateChange={this.handleDateChange}
                    />
                </div>
                <div style={{ width: "50%" }}>
                    <SingleDatePicker
                        date={date}
                        onDateChange={this.handleDateChange}
                    />
                </div>
            </div>
        );
    }
}
