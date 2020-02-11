/* eslint-disable react/forbid-foreign-prop-types */

import { Ref, TextArea as SemanticTextArea } from "semantic-ui-react";
import { bool, func, number, object, oneOfType } from "prop-types";
import { createRef, forwardRef, useEffect } from "react";
import { isNil } from "lodash";
import { mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = [];

const propTypes = {
    /**
     * Whether or not the textarea should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * Whether or not the textarea is invalid.
     */
    error: bool,
    /**
     * Whether or not the textarea is valid.
     */
    success: bool,
    /**
     * Whether or not a user is currently interacting with the textarea.
     */
    focused: bool,
    /**
     * Whether or not the textarea is transparent.
     */
    transparent: bool,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    autofocus: false,
    error: false,
    success: false,
    focused: false,
    transparent: false
};

function focus(textAreaRef) {
    if (!isNil(textAreaRef.current)) {
        textAreaRef.current.focus();
    }
}

function useDelayedAutofocus(autofocus, autofocusDelay, disabled, textAreaRef) {
    useEffect(() => {
        let timeoutId;

        if (autofocus && !disabled && !isNil(autofocusDelay)) {
            timeoutId = setTimeout(() => {
                focus(textAreaRef);
            }, autofocusDelay);
        }

        return () => {
            if (!isNil(timeoutId)) {
                clearTimeout(timeoutId);
            }
        };
    }, [autofocus, autofocusDelay, disabled, textAreaRef]);
}

export function PureTextArea(props) {
    const { autofocus, autofocusDelay, className, disabled, error, success, focused, transparent, children, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-input");

    useDelayedAutofocus(autofocus, autofocusDelay, disabled, forwardedRef);

    const shouldAutofocus = autofocus && isNil(autofocusDelay);

    const classes = mergeClasses(
        "ui textarea",
        error && "error",
        success && "success",
        focused && "focus",
        transparent && "transparent",
        className
    );

    return (
        <Ref innerRef={forwardedRef}>
            <SemanticTextArea {...rest} autoFocus={shouldAutofocus} disabled={disabled} className={classes}>{children}</SemanticTextArea>
        </Ref>
    );
}

PureTextArea.propTypes = propTypes;
PureTextArea.defaultProps = defaultProps;

export const TextArea = forwardRef((props, ref) => (
    <PureTextArea { ...props } forwardedRef={ref || createRef()} />
));
