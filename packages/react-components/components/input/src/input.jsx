/* eslint-disable react/forbid-foreign-prop-types */

import { Ref, Input as SemanticInput } from "semantic-ui-react";
import { bool, element, func, number, object, oneOf, oneOfType } from "prop-types";
import { createIconForControl } from "@orbit-ui/react-icons";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { isNil } from "lodash";
import { throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const UNSUPPORTED_PROPS = ["action", "actionPosition", "inverted"];

const propTypes = {
    /**
     * Whether or not the input should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * A React SVG component displayed before or after the prompt based on "iconPosition".
     */
    icon: element,
    /**
     * An input can vary in sizes.
     */
    size: oneOf(SIZES),
    /**
     * @ignore
     */
    disabled: bool,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    autofocus: false,
    size: DEFAULT_SIZE,
    disabled: false
};

function getInputElement(inputRef) {
    return inputRef.current.querySelector("input");
}

function focus(inputRef) {
    if (!isNil(inputRef.current)) {
        getInputElement(inputRef).focus();
    }
}

function useDelayedAutofocus(autofocus, autofocusDelay, disabled, inputRef) {
    useEffect(() => {
        let timeoutId;

        if (autofocus && !disabled && !isNil(autofocusDelay)) {
            timeoutId = setTimeout(() => {
                focus(inputRef);
            }, autofocusDelay);
        }

        return () => {
            if (!isNil(timeoutId)) {
                clearTimeout(timeoutId);
            }
        };
    }, [autofocus, autofocusDelay, disabled, inputRef]);
}

export function PureInput(props) {
    const { autofocus, autofocusDelay, icon, size, disabled, children, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-input");

    const inputRef = useRef();

    useImperativeHandle(forwardedRef, () => getInputElement(inputRef));
    useDelayedAutofocus(autofocus, autofocusDelay, disabled, inputRef);

    const renderIcon = () => {
        const { loading } = props;

        if (!isNil(icon) && !loading) {
            return createIconForControl(icon, size);
        }
    };

    const shouldAutofocus = autofocus && !disabled && isNil(autofocusDelay);

    return (
        <Ref innerRef={inputRef}>
            <SemanticInput
                icon={renderIcon()}
                autoFocus={shouldAutofocus}
                size={size}
                disabled={disabled}
                data-testid="input"
                {...rest}
            >
                {children}
            </SemanticInput>
        </Ref>
    );
}

PureInput.propTypes = propTypes;
PureInput.defaultProps = defaultProps;

export const Input = forwardRef((props, ref) => (
    <PureInput { ...props } forwardedRef={ref} />
));

if (!isNil(SemanticInput.propTypes)) {
    SemanticInput.propTypes.size = oneOf(SIZES);
}
