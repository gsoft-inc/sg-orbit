import { PopperTrigger } from "./PopperTrigger";
import { augmentElementProps, useEventCallback } from "../../shared";
import { createTextInput } from "../../text-input";
import { element, object, oneOfType } from "prop-types";
import { forwardRef, useRef } from "react";
import { isElement } from "react-is";
import { isFunction, isNil } from "lodash";

const propTypes = {
    /**
     * The text input trigger.
     */
    input: oneOfType([element, object]).isRequired
};

function useInput(input, buttonRef) {
    const button = isElement(input) ? input.props.button : input.button;
    const augmentedButton = isNil(button) ? button : augmentElementProps(button, {
        ref: buttonRef
    });

    return createTextInput(input, {
        button: augmentedButton
    });
}

export function InnerPopperTextInputTrigger({ input, onClick, forwardedRef, ...rest }) {
    const buttonRef = useRef();

    const handleClick = useEventCallback(() => {
        let canPropagate = true;

        if (!isNil(buttonRef.current)) {
            canPropagate = !buttonRef.current.contains(event.target);
        }

        if (canPropagate) {
            if (isFunction(onClick)) {
                onClick(event);
            }
        }
    });

    const trigger = useInput(input, buttonRef);

    return (
        <PopperTrigger
            {...rest}
            trigger={trigger}
            toggleHandler="onClick"
            onClick={handleClick}
            ref={forwardedRef}
        />
    );
}

InnerPopperTextInputTrigger.propTypes = propTypes;

export const PopperTextInputTrigger = forwardRef((props, ref) => (
    <InnerPopperTextInputTrigger {...props} forwardedRef={ref} />
));
