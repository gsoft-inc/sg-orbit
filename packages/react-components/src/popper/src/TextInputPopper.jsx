import { AutoControlledPopper } from "./AutoControlledPopper";
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

    const augmentedInputButton = isNil(inputButton) ? inputButton : augmentElementProps(inputButton, {
        ref: inputButtonRef
    });

    const trigger = createTextInput(input, {
        button: augmentedInputButton
    });

    return (
        <AutoControlledPopper
            {...rest}
            trigger={trigger}
            toggleHandler="onClick"
            onClick={handleClick}
            ref={forwardedRef}
        />
    );
}

InnerTextInputPopper.propTypes = propTypes;

export const TextInputPopper = forwardRef((props, ref) => (
    <InnerTextInputPopper {...props} forwardedRef={ref} />
));
