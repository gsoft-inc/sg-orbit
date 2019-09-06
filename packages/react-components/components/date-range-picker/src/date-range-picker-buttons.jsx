import { Button } from "semantic-ui-react";
import { PureComponent } from "react";
import { bool, func, string } from "prop-types";
import { isNil } from "lodash";
import momentPropTypes from "react-moment-proptypes";

export class DateRangePickerButtons extends PureComponent {
    static propTypes = {
        startDate: momentPropTypes.momentObj,
        endDate: momentPropTypes.momentObj,
        onClear: func,
        onApply: func,
        allowSingleDateSelection: bool,
        allowClear: bool,
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

    renderClearButton() {
        const { allowClear, clearText } = this.props;

        if (!allowClear) {
            return null;
        }

        // Must used a CSS class to hide the button instead of conditional rendering otherwise clicking the button will be considered an outside click.
        return (
            <Button onClick={this.handleClear} className={!this.canClear() ? "ghost short disabled" : "ghost short"}>
                {clearText}
            </Button>
        );
    }

    renderApplyButton() {
        const { applyText } = this.props;


        return (
            // Sadly, the div container is necessary to apply styled-jsx. Fragment doesn't work.
            <div className="container">
                {/* Must used a CSS class to hide the button instead of conditional rendering otherwise clicking the button will be considered an outside click. */}
                <Button onClick={this.handleApply} className={!this.canApply() ? "ghost short disabled" : "primary ghost short"}>
                    {applyText}
                </Button>

                <style jsx>{`
                    .container {
                        margin-left: auto;
                    }
                `}</style>
            </div>
        );
    }

    render() {
        const { className } = this.props;

        const defaultClasses = "flex ph6 pb6";
        const classes = isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;

        return (
            <div className={classes}>
                {this.renderClearButton()}
                {this.renderApplyButton()}
            </div>
        );
    }
}
