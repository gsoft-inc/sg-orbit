import { DateRangePicker } from "@react-components/date-picker";
import { PureComponent } from "react";
import { bool } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import moment from "moment";

export class ControlledDateRangePicker extends PureComponent {
    static propTypes = {
        startDate: momentType,
        endDate: momentType,
        open: bool
    };

    static defaultProps = {
        open: false
    };

    state = {
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        open: this.props.open
    };

    handleDatesChange = (event, startDate, endDate) => {
        const { onDatesChange } = this.props;

        this.setState({ startDate, endDate });
        onDatesChange(event, startDate, endDate);
    };

    handleVisibilityChange = (event, open) => {
        this.setState({ open });
    };

    render() {
        const { startDate, endDate, open } = this.state;

        const labelStyle = {
            width: "80px"
        };

        return (
            <>
                <div className="mb6">
                    <div className="mb1">
                        <span className="dib fw6" style={labelStyle}>startDate:</span> {isNil(startDate) ? "null" : moment(startDate).format("YYYY-MM-DD")}
                    </div>
                    <div className="mb1">
                        <span className="dib fw6" style={labelStyle}>endDate:</span> {isNil(endDate) ? "null" : moment(endDate).format("YYYY-MM-DD")}
                    </div>
                    <div className="mb1">
                        <span className="dib fw6" style={labelStyle}>open:</span> {open ? "true" : "false"}
                    </div>
                </div>

                <DateRangePicker
                    { ...this.state }
                    onDatesChange={this.handleDatesChange}
                    onVisibilityChange={this.handleVisibilityChange}
                />
            </>
        );
    }
}
