import { PopperTrigger } from "./popper-trigger";
import { cloneElement, forwardRef, useCallback, useRef } from "react";
import { createTextInput } from "../../text-input";
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
    onClick: func
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

function useButtonRenderer({ hasButton, button }, buttonRef) {
    const ref = useCombinedRefs(buttonRef, hasButton && !isNil(button.ref) ? button.ref : undefined);

    return () => {
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
}

function useTriggerRenderer({ input, isElement, hasButton }, button) {
    return () => {
        if (isElement) {
            if (hasButton) {
                return cloneElement(input, {
                    ...input.props,
                    button: button
                });
            }

            return input;
        }

        if (hasButton) {
            return createTextInput({
                ...input,
                button: button
            });
        }

        return createTextInput(input);
    };
}

function useRenderer({ forwardedRef, rest }, handleClick, trigger) {
    return () => {
        return (
            <PopperTrigger
                {...rest}
                trigger={trigger}
                toggleHandler="onClick"
                onClick={handleClick}
                ref={forwardedRef}
            />
        );
    };
}

export function InnerPopperTextInputTrigger({ input, onClick, forwardedRef, ...rest }) {
    const buttonRef = useRef();

    const parsingResult = parseInput(input);

    const handleClick = useHandleClick(onClick, buttonRef);

    const renderButton = useButtonRenderer(parsingResult, buttonRef);
    const renderTrigger = useTriggerRenderer(parsingResult, renderButton());
    const render = useRenderer({ forwardedRef, rest }, handleClick, renderTrigger());

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

InnerPopperTextInputTrigger.propTypes = propTypes;

export const PopperTextInputTrigger = forwardRef((props, ref) => (
    <InnerPopperTextInputTrigger {...props} forwardedRef={ref} />
));
