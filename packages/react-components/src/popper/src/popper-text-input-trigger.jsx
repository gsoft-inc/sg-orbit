import { PopperTrigger } from "./popper-trigger";
import { cloneElement, forwardRef, useCallback, useRef } from "react";
import { createInputFromShorthand } from "../../input";
import { element, func, object, oneOfType } from "prop-types";
import { isFunction, isNil } from "lodash";
import { isElement as isReactElement } from "react-is";
import { useCombinedRefs } from "../../shared";

const propTypes = {
    /**
     * The text input trigger.
     */
    input: oneOfType([element, object]).isRequired,
    /**
     * @ignore
     */
    onClick: func,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

function parseInput(input) {
    const result = (isElement, hasButton, button) => ({
        input,
        isElement,
        hasButton,
        button
    });

    if (isReactElement(input)) {
        const button = input.props.button;

        return result(true, !isNil(button), button);
    }

    return result(false, !isNil(input.button), input.button);
}

function useButtonRenderer({ hasButton, button }, buttonRef) {
    const ref = useCombinedRefs(buttonRef, hasButton && !isNil(button.ref) ? button.ref : undefined);

    const renderer = () => {
        if (isReactElement(button)) {
            return cloneElement(button, {
                ...button.props,
                ref
            });
        }

        return {
            ...button,
            ref
        };
    };

    return renderer;
}

function useTriggerRenderer({ input, isElement, hasButton }, buttonRenderer) {
    return () => {
        if (isElement) {
            if (hasButton) {
                return cloneElement(input, {
                    ...input.props,
                    button: buttonRenderer()
                });
            }

            return input;
        }

        if (hasButton) {
            return createInputFromShorthand({
                ...input,
                button: buttonRenderer()
            });
        }

        return createInputFromShorthand(input);
    };
}

function useHandleClick(onClick, buttonRef) {
    return useCallback(event => {
        let canPropagate = true;

        if (!isNil(buttonRef.current)) {
            canPropagate = !buttonRef.current.contains(event.target);
        }

        if (canPropagate) {
            if (isFunction(onClick)) {
                onClick(event);
            }
        }
    }, [buttonRef, onClick]);
}

export function InnerPopperTextInputTrigger({ input, onClick, forwardedRef, ...rest }) {
    const buttonRef = useRef();

    const parsingResult = parseInput(input);

    const buttonRenderer = useButtonRenderer(parsingResult, buttonRef);
    const triggerRenderer = useTriggerRenderer(parsingResult, buttonRenderer);

    const handleClick = useHandleClick(onClick, buttonRef);

    return (
        <PopperTrigger
            {...rest}
            trigger={triggerRenderer()}
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
