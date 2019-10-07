import { BOTTOM_LEFT, POSITIONS, Popup } from "@orbit-ui/react-popup";
import { PureComponent } from "react";
import { arrayOf, bool, func, node, oneOf, string } from "prop-types";
import { isNil } from "lodash";

export class DatePickerAnchor extends PureComponent {
    static propTypes = {
        open: bool.isRequired,
        input: node.isRequired,
        calendar: node.isRequired,
        position: oneOf(POSITIONS),
        offsets: arrayOf(string),
        // eslint-disable-next-line react/no-unused-prop-types
        onVisibilityChange: func
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
        const { open, input, calendar, position, offsets, className } = this.props;

        return (
            <Popup
                open={open}
                trigger={input}
                position={position}
                offsets={offsets}
                onVisibilityChange={this.handleVisibilityChange}
                className={className}
            >
                {calendar}
            </Popup>
        );
    }
}
