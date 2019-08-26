import { Button } from "semantic-ui-react";
import { PureComponent } from "react";
import { bool, func, object, string } from "prop-types";
import { isNil } from "lodash";

export class DateRangePickerButtons extends PureComponent {
    static propTypes = {
        startDate: object,
        endDate: object,
        onClear: func,
        onApply: func,
        allowSingleDateSelection: bool,
        clearText: string,
        applyText: string,
        className: string
    };

    handleClear = event => {
        const { onClear } = this.props;

        if (this.canClear()) {
            onClear(event, this.props);
        }
    };

    handleApply = event => {
        const { onApply } = this.props;

        if (this.canApply()) {
            onApply(event, this.props);
        }
    };

    canClear() {
        const { startDate, endDate } = this.props;

        return !isNil(startDate) || !isNil(endDate);
    }

    canApply() {
        const { startDate, endDate, allowSingleDateSelection } = this.props;

        if (allowSingleDateSelection) {
            return true;
        }

        if (isNil(startDate) && isNil(endDate)) {
            return true;
        }

        if (!isNil(startDate) && !isNil(endDate)) {
            return true;
        }

        return false;
    }

    render() {
        const { clearText, applyText, className } = this.props;

        const defaultClasses = "flex justify-between ph6 pb6";
        const classes = isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;

        return (
            <div className={classes}>
                {/* Must used a CSS class to hide the button instead of conditional rendering otherwise clicking the button will be considered an outside click. */}
                <Button onClick={this.handleClear} className={!this.canClear() ? "ghost short disabled" : "ghost short"}>
                    {clearText}
                </Button>
                <Button onClick={this.handleApply} className={!this.canApply() ? "ghost short disabled" : "primary ghost short"}>
                    {applyText}
                </Button>
            </div>
        );
    }
}
