import { PopperTrigger } from "./popper-trigger";
import { cloneElement, useCallback, useRef } from "react";
import { createInputFromShorthand } from "../../input";
import { element, object, oneOfType } from "prop-types";
import { isElement } from "react-is";
import { isFunction, isNil } from "lodash";

const propTypes = {
    input: oneOfType([element, object]).isRequired
};

export function PopperTextInputTrigger({ input, onClick, ...rest }) {
    const buttonRef = useRef();

    const handleClick = useCallback(event => {
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

    const renderButton = button => {
        if (isElement(button)) {
            return cloneElement(button, {
                ...button.props,
                ref: buttonRef
            });
        }

        return {
            ...button,
            ref: buttonRef
        };
    };

    const renderTrigger = () => {
        if (isElement(input)) {
            const button = input.props.button;

            if (!isNil(button)) {
                return cloneElement(input, {
                    ...input.props,
                    button: renderButton(button)
                });
            }

            return input;
        }

        const button = input.button;

        if (!isNil(button)) {
            return createInputFromShorthand({
                ...input,
                button: renderButton(button)
            });
        }

        return createInputFromShorthand(input);
    };

    return (
        <PopperTrigger
            {...rest}
            trigger={renderTrigger()}
            toggleHandler="onClick"
            onClick={handleClick}
        />
    );
}

PopperTextInputTrigger.propTypes = propTypes;
