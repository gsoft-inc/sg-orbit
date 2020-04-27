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
        // zIndex: string,
        // eslint-disable-next-line react/no-unused-prop-types
        onVisibilityChange: func,
        closeOnBlur: bool,
        closeOnOutsideClick: bool,
        // fluid: bool,
        className: string,
        style: object
    };

    static defaultProps = {
        position: "bottom-start",
        offset: [0, 10]
    };

    handleVisibilityChange = (event, visible) => {
        const { onVisibilityChange } = this.props;

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, visible, this.props);
        }
    };

    render() {
        // const { open, input, calendar, position, offsets, zIndex, closeOnBlur, closeOnOutsideClick, fluid, className, style } = this.props;
        const { open, input, calendar, position, offset, closeOnBlur, closeOnOutsideClick, className, style } = this.props;

        return (
            <PopperTrigger.TextInput
                open={open}
                input={input}
                position={position}
                offset={offset}
                // zIndex={zIndex}
                onVisibilityChange={this.handleVisibilityChange}
                hideOnBlur={closeOnBlur}
                hideOnOutsideClick={closeOnOutsideClick}
                // fluid={fluid}
                className={className}
                style={style}
            >
                {calendar}
            </PopperTrigger.TextInput>
        );

        // return (
        //     <Popup
        //         open={open}
        //         trigger={input}
        //         position={position}
        //         offsets={offsets}
        //         zIndex={zIndex}
        //         onVisibilityChange={this.handleVisibilityChange}
        //         closeOnBlur={closeOnBlur}
        //         closeOnOutsideClick={closeOnOutsideClick}
        //         fluid={fluid}
        //         className={className}
        //         style={style}
        //     >
        //         {calendar}
        //     </Popup>
        // );
    }
}
