import { BOTTOM_LEFT, POSITIONS, Popup } from "../../popup";
import { PureComponent } from "react";
import { arrayOf, bool, func, node, object, oneOf, string } from "prop-types";
import { isNil } from "lodash";

export class DatePickerAnchor extends PureComponent {
    static propTypes = {
        open: bool.isRequired,
        input: node.isRequired,
        calendar: node.isRequired,
        position: oneOf(POSITIONS),
        offsets: arrayOf(string),
        zIndex: string,
        // eslint-disable-next-line react/no-unused-prop-types
        onVisibilityChange: func,
        closeOnBlur: bool,
        closeOnOutsideClick: bool,
        fluid: bool,
        className: string,
        style: object
    };

    static defaultProps = {
        position: BOTTOM_LEFT,
        offsets: ["0px", "10px"]
    };

    handleVisibilityChange = (event, visible) => {
        const { onVisibilityChange } = this.props;

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, visible, this.props);
        }
    };

    render() {
        const { open, input, calendar, position, offsets, zIndex, closeOnBlur, closeOnOutsideClick, fluid, className, style } = this.props;

        return (
            <Popup
                open={open}
                trigger={input}
                position={position}
                offsets={offsets}
                zIndex={zIndex}
                onVisibilityChange={this.handleVisibilityChange}
                closeOnBlur={closeOnBlur}
                closeOnOutsideClick={closeOnOutsideClick}
                fluid={fluid}
                className={className}
                style={style}
            >
                {calendar}
            </Popup>
        );
    }
}
