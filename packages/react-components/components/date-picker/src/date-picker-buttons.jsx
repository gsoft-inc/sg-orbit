import { Button } from "semantic-ui-react";
import { PureComponent } from "react";
import { bool, func, string } from "prop-types";
import { isNil } from "lodash";

export class DatePickerButtons extends PureComponent {
    static propTypes = {
        canClear: bool.isRequired,
        canApply: bool.isRequired,
        onClear: func,
        onApply: func,
        allowClear: bool,
        clearText: string,
        applyText: string,
        className: string
    };

    static defaultProps = {
        clearText: "Clear",
        applyText: "Apply"
    };

    handleClear = event => {
        const { canClear, onClear } = this.props;

        if (canClear) {
            onClear(event, this.props);
        }
    };

    handleApply = event => {
        const { canApply, onApply } = this.props;

        if (canApply) {
            onApply(event, this.props);
        }
    };

    renderClearButton() {
        const { canClear, allowClear, clearText } = this.props;

        if (!allowClear) {
            return null;
        }

        // Must used a CSS class to hide the button instead of conditional rendering otherwise clicking the button will be considered an outside click.
        return (
            <Button
                onClick={this.handleClear}
                className={!canClear ? "ghost short disabled" : "ghost short"}
                type="button"
                data-testid="date-picker-calendar-clear-button"
            >
                {clearText}
            </Button>
        );
    }

    renderApplyButton() {
        const { canApply, applyText } = this.props;


        return (
            // Sadly, the div container is necessary to apply styled-jsx. Fragment doesn't work.
            <div className="container">
                {/* Must used a CSS class to hide the button instead of conditional rendering otherwise clicking the button will be considered an outside click. */}
                <Button
                    onClick={this.handleApply}
                    className={!canApply ? "ghost short disabled" : "primary ghost short"}
                    role="button"
                    data-testid="date-picker-calendar-apply-button"
                >
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
