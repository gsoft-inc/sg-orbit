import { AutoControlledPopper } from "../../popper";
import { PureComponent } from "react";
import { bool, element, func, number, object, oneOf, string } from "prop-types";
import { isNil } from "lodash";
import { resolvePopperPosition } from "../../shared";

export class DatePickerAnchor extends PureComponent {
    static propTypes = {
        open: bool.isRequired,
        input: element.isRequired,
        calendar: element.isRequired,
        upward: bool,
        direction: oneOf(["left", "right"]),
        pinned: bool,
        zIndex: number,
        onVisibilityChange: func,
        fluid: bool,
        noPortal: bool,
        className: string,
        style: object
    };

    static defaultProps = {
        upward: false,
        direction: "right",
        pinned: false,
        zIndex: 2
    };

    handleVisibilityChange = (event, visible) => {
        const { onVisibilityChange } = this.props;

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, visible);
        }
    };

    render() {
        const { open, input, calendar, upward, direction, pinned, zIndex, disabled, fluid, noPortal, className, style } = this.props;

        return (
            <AutoControlledPopper
                show={open}
                trigger={input}
                position={resolvePopperPosition(upward, direction)}
                pinned={pinned}
                offset={[0, 10]}
                onVisibilityChange={this.handleVisibilityChange}
                focusFirstElementOnKeyboardShow
                zIndex={zIndex}
                disabled={disabled}
                fluid={fluid}
                noPortal={noPortal}
                className={className}
                style={style}
            >
                {calendar}
            </AutoControlledPopper>
        );
    }
}
