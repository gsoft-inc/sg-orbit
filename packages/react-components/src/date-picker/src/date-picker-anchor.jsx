import { POSITIONS, PopperTrigger } from "../../popper";
import { PureComponent } from "react";
import { arrayOf, bool, element, func, number, object, oneOf, string } from "prop-types";
import { isNil } from "lodash";

export class DatePickerAnchor extends PureComponent {
    static propTypes = {
        open: bool.isRequired,
        input: element.isRequired,
        calendar: element.isRequired,
        position: oneOf(POSITIONS),
        offset: arrayOf(number),
        zIndex: number,
        onVisibilityChange: func,
        closeOnBlur: bool,
        closeOnOutsideClick: bool,
        fluid: bool,
        className: string,
        style: object
    };

    static defaultProps = {
        position: "bottom-start",
        offset: [0, 10],
        zIndex: 2
    };

    handleVisibilityChange = (event, visible) => {
        const { onVisibilityChange } = this.props;

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, visible);
        }
    };

    render() {
        const { open, input, calendar, position, offset, zIndex, closeOnBlur, closeOnOutsideClick, disabled, fluid, className, style } = this.props;

        return (
            <PopperTrigger.TextInput
                show={open}
                input={input}
                position={position}
                offset={offset}
                onVisibilityChange={this.handleVisibilityChange}
                hideOnBlur={closeOnBlur}
                hideOnOutsideClick={closeOnOutsideClick}
                focusFirstElementOnShow
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
