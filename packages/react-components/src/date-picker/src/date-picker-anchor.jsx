import { AutoControlledPopper } from "../../popper";
import { PureComponent, cloneElement, forwardRef } from "react";
import { augmentElement, resolvePopperPosition, useMergedRefs } from "../../shared";
import { bool, element, func, number, object, oneOf, string } from "prop-types";
import { isNil } from "lodash";

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
        zIndex: 3
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
                onVisibilityChange={this.handleVisibilityChange}
                focusFirstElementOnKeyboardShow
                fluid={fluid}
                className={className}
                style={style}
            >
                <AutoControlledPopper.Trigger
                    as={forwardRef((asProps, ref) => {
                        return augmentElement(input, {
                            ...asProps,
                            ref
                        });
                    })}
                    disabled={disabled}
                />
                <AutoControlledPopper.Popper
                    position={resolvePopperPosition(upward, direction)}
                    pinned={pinned}
                    offset={[0, 10]}
                    zIndex={zIndex}
                    noPortal={noPortal}
                >
                    {calendar}
                </AutoControlledPopper.Popper>
            </AutoControlledPopper>
        );
    }
}
