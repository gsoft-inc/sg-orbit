import { Anchor } from "./anchor";
import { ArgumentError } from "@orbit-ui/react-components-shared";
import { POSITIONS, isTop } from "./positions";
import { PureComponent } from "react";
import { arrayOf, bool, func, node, oneOf, string } from "prop-types";
import { isNil } from "lodash";

export function ensureMinDateIsNotAfterMaxDate(minDate, maxDate, componentName) {
    if (!isNil(minDate) && !isNil(maxDate)) {
        if (minDate.isSameOrAfter(maxDate)) {
            throw new ArgumentError(`${componentName} - "minDate" must be before "maxDate".`);
        }
    }
}

export class DatePicker extends PureComponent {
    static propTypes = {
        input: node.isRequired,
        calendar: node.isRequired,
        open: bool.isRequired,
        inputHeight: node.isRequired,
        onOutsideClick: func.isRequired,
        onEscapeKeyDown: func.isRequired,
        position: oneOf(POSITIONS),
        offsets: arrayOf(string),
        disabled: bool,
        className: string
    };

    static defaultProps = {
        disabled: false
    };

    handleOutsideClick = event => {
        const { onOutsideClick } = this.props;

        onOutsideClick(event, this.props);
    }

    handleEscapeKeyDown = event => {
        const { onEscapeKeyDown } = this.props;

        onEscapeKeyDown(event, this.props);
    }

    getCssClasses() {
        const { className } = this.props;

        const defaultClasses = "relative";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    getAnchorOffsets() {
        const { inputHeight, position, offsets } = this.props;

        if (!isNil(offsets)) {
            return offsets;
        }

        return ["0px", isTop(position) ? `${inputHeight}px` : "0px"];
    }

    render() {
        const { calendar, input, open, position, disabled } = this.props;

        return (
            <div className={this.getCssClasses()}>
                {input}
                <If condition={!disabled}>
                    <Anchor
                        open={open}
                        position={position}
                        offsets={this.getAnchorOffsets()}
                        onOutsideClick={this.handleOutsideClick}
                        onEscapeKeyDown={this.handleEscapeKeyDown}
                    >
                        <div>{calendar}</div>
                    </Anchor>
                </If>
            </div>
        );
    }
}
