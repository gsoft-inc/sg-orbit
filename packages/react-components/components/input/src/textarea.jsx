/* eslint-disable react/forbid-foreign-prop-types */

import { DEFAULT_SIZE, SIZES } from "./sizes";
import { Ref, TextArea as SemanticTextArea } from "semantic-ui-react";
import { bool, func, number, object, oneOf, oneOfType } from "prop-types";
import { createRef, forwardRef, useEffect } from "react";
import { isNil } from "lodash";
import { mergeClasses } from "@orbit-ui/react-components-shared";

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
     * A textarea can have different sizes.
    */
    size: oneOf(SIZES),
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
    transparent: false,
    size: DEFAULT_SIZE
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
    const { autofocus, autofocusDelay, className, disabled, error, success, focused, transparent, size, children, forwardedRef, ...rest } = props;
    useDelayedAutofocus(autofocus, autofocusDelay, disabled, forwardedRef);

    const shouldAutofocus = autofocus && isNil(autofocusDelay);

    const classes = mergeClasses(
        "ui textarea",
        error && "error",
        success && "success",
        focused && "focus",
        transparent && "transparent",
        size && size,
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
