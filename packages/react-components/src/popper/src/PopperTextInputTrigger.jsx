import { PopperTrigger } from "./PopperTrigger";
import { cloneElement, forwardRef, useRef } from "react";
import { createTextInput } from "../../text-input";
import { element, object, oneOfType } from "prop-types";
import { isElement } from "react-is";
import { isFunction, isNil } from "lodash";
import { useCombinedRefs, useEventCallback } from "../../shared";

const propTypes = {
    /**
     * The text input trigger.
     */
    input: oneOfType([element, object]).isRequired
};

function extendInputButton(button, ref) {
    if (isElement(button)) {
        return cloneElement(button, {
            ...button.props,
            ref
        });
    }

    return {
        ...button,
        ref
    };
}

function useExtendedInputButton(input, buttonRef) {
    const button = isElement(input) ? input.props.button : input.button;
    const hasButton = !isNil(button);

    const ref = useCombinedRefs(buttonRef, hasButton && !isNil(button.ref) ? button.ref : undefined);

    if (hasButton) {
        return extendInputButton(button, ref);
    }
}

function useInput(input, buttonRef) {
    const button = useExtendedInputButton(input, buttonRef);

    return createTextInput(input, {
        button
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
