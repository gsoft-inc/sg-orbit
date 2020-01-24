/* eslint-disable react/forbid-foreign-prop-types */

import { Ref, Input as SemanticInput } from "semantic-ui-react";
import { bool, element, func, number, object, oneOf, oneOfType } from "prop-types";
import { cloneElement, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { isNil } from "lodash";
import { mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

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
     * A custom React SVG component displayed before or after the prompt based on "iconPosition".
     */
    icon: element,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    autofocus: false
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
    const { icon, autofocus, autofocusDelay, disabled, children, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS);

    const inputRef = useRef();

    useImperativeHandle(forwardedRef, () => getInputElement(inputRef));
    useDelayedAutofocus(autofocus, autofocusDelay, disabled, inputRef);

    const renderIcon = () => {
        const { loading } = props;

        if (!isNil(icon) && !loading) {
            return cloneElement(icon, {
                className: mergeClasses(
                    "icon",
                    icon.props && icon.props.className
                )
            });
        }
    };

    const shouldAutofocus = autofocus && isNil(autofocusDelay);

    return (
        <Ref innerRef={inputRef}>
            <SemanticInput icon={renderIcon()} {...rest} autoFocus={shouldAutofocus} disabled={disabled}>{children}</SemanticInput>
        </Ref>
    );
}

PureInput.propTypes = propTypes;
PureInput.defaultProps = defaultProps;

export const Input = forwardRef((props, ref) => (
    <PureInput { ...props } forwardedRef={ref} />
));

if (!isNil(SemanticInput.propTypes)) {
    SemanticInput.propTypes.size = oneOf(["small", "medium", "large"]);
}
