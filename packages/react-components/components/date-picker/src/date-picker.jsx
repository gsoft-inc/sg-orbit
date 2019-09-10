import { Anchor } from "./anchor";
import { KEYS } from "@orbit-ui/react-components-shared";
import { POSITIONS, isTop } from "./positions";
import { PureComponent } from "react";
import { arrayOf, bool, func, node, oneOf, string } from "prop-types";
import { isNil } from "lodash";

export function useHandleInputKeyDown(toggleCalendarVisibility) {
    return event => {
        const key = event.keyCode;

        if (key === KEYS.space || key === KEYS.enter) {
            if (key === KEYS.space) {
                event.preventDefault();
            }

            toggleCalendarVisibility(event);
        }
    };
}

export class DatePicker extends PureComponent {
    static propTypes = {
        input: node.isRequired,
        calendar: node.isRequired,
        open: bool.isRequired,
        inputHeight: node.isRequired,
        onOutsideClick: func.isRequired,
        onEscapeKeyDown: func.isRequired,
        position: oneOf(POSITIONS).isRequired,
        offsets: arrayOf(string),
        disabled: bool.isRequired,
        className: string
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
