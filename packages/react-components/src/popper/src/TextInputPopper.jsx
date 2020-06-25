import { AutoControlledPopper } from "./AutoControlledPopper";
import { augmentElement, useEventCallback } from "../../shared";
import { element } from "prop-types";
import { forwardRef, useRef } from "react";
import { isElement } from "react-is";
import { isFunction, isNil } from "lodash";

const propTypes = {
    /**
     * The text input trigger.
     */
    input: element.isRequired
};

export function InnerTextInputPopper({ input, onClick, forwardedRef, ...rest }) {
    const inputButtonRef = useRef();

    const handleClick = useEventCallback(() => {
        let canPropagate = true;

        if (!isNil(inputButtonRef.current)) {
            canPropagate = !inputButtonRef.current.contains(event.target);
        }

        if (canPropagate) {
            if (isFunction(onClick)) {
                onClick(event);
            }
        }
    });

    const inputButton = isElement(input) ? input.props.button : input.button;

    const trigger = augmentElement(input, {
        button: isNil(inputButton) ? undefined : augmentElement(inputButton, {
            ref: inputButtonRef
        })
    });

    return (
        <AutoControlledPopper
            {...rest}
            trigger={trigger}
            onClick={handleClick}
            ref={forwardedRef}
        />
    );
}

InnerTextInputPopper.propTypes = propTypes;

export const TextInputPopper = forwardRef((props, ref) => (
    <InnerTextInputPopper {...props} forwardedRef={ref} />
));
