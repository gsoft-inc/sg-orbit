import { POSITIONS, PopperTrigger } from "../../popper";
import { PureComponent } from "react";
import { arrayOf, bool, func, node, number, object, oneOf, string } from "prop-types";
import { isNil } from "lodash";

export class DatePickerAnchor extends PureComponent {
    static propTypes = {
        open: bool.isRequired,
        input: node.isRequired,
        calendar: node.isRequired,
        position: oneOf(POSITIONS),
        offset: arrayOf(number),
        zIndex: number,
        // eslint-disable-next-line react/no-unused-prop-types
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
            onVisibilityChange(event, visible, this.props);
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
