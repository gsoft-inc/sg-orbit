import { PopperTrigger } from "../../popper";
import { PureComponent } from "react";
import { bool, element, func, number, object, string } from "prop-types";
import { isNil } from "lodash";

export class DatePickerAnchor extends PureComponent {
    static propTypes = {
        open: bool.isRequired,
        input: element.isRequired,
        calendar: element.isRequired,
        upward: bool,
        zIndex: number,
        onVisibilityChange: func,
        closeOnBlur: bool,
        closeOnOutsideClick: bool,
        fluid: bool,
        className: string,
        style: object
    };

    static defaultProps = {
        zIndex: 2
    };

    handleVisibilityChange = (event, visible) => {
        const { onVisibilityChange } = this.props;

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, visible);
        }
    };

    render() {
        const { open, input, calendar, upward, zIndex, closeOnBlur, closeOnOutsideClick, disabled, fluid, className, style } = this.props;

        return (
            <PopperTrigger.TextInput
                show={open}
                input={input}
                position={upward ? "top-start" : "bottom-start"}
                offset={[0, 10]}
                onVisibilityChange={this.handleVisibilityChange}
                hideOnBlur={closeOnBlur}
                hideOnOutsideClick={closeOnOutsideClick}
                focusFirstElementOnKeyboardShow
                disabled={disabled}
                fluid={fluid}
                zIndex={zIndex}
                className={className}
                style={style}
            >
                {calendar}
            </PopperTrigger.TextInput>
        );
    }
}
