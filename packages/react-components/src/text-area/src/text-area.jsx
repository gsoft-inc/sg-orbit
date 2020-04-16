import { Ref, TextArea as SemanticTextArea } from "semantic-ui-react";
import { bool, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useEffect, useRef } from "react";
import { isNil } from "lodash";
import { mergeClasses, useCombinedRefs } from "../../shared";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const propTypes = {
    /**
     * The value of the textarea.
     */
    value: string,
    /**
     * The default value of the textarea.
     */
    defaultValue: string,
    /**
     * Whether or not the textarea should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * A textarea can have different sizes.
    */
    size: oneOf(SIZES),
    /**
     * Whether or not the textarea take up the width of its container
     */
    fluid: bool,
    /**
     * A textarea can show that the data contains errors.
     */
    error: bool,
    /**
     * Whether or not a user is currently interacting with the textarea.
     */
    focused: bool,
    /**
     * Whether or not the textarea is transparent.
     */
    transparent: bool,
    /**
     * Whether or not the textarea is resizable.
     */
    resizable: bool,
    /**
     * @ignore
     */
    disabled: bool,
    /**
     * @ignore
     */
    className: string,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    autofocus: false,
    error: false,
    fluid: false,
    focused: false,
    transparent: false,
    resizable: false,
    disabled: false,
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
    const { autofocus, autofocusDelay, size, error, fluid, focused, transparent, resizable, disabled, className, children, forwardedRef, ...rest } = props;

    const innerRef = useCombinedRefs(forwardedRef);
    const shouldAutofocus = autofocus && !disabled && isNil(autofocusDelay);

    useDelayedAutofocus(autofocus, autofocusDelay, disabled, innerRef);

    const classes = mergeClasses(
        "ui textarea",
        error && "error",
        fluid && "fluid",
        focused && "focus",
        transparent && "transparent",
        resizable && "resizable",
        size && size,
        className
    );

    return (
        <Ref innerRef={innerRef}>
            <SemanticTextArea
                autoFocus={shouldAutofocus}
                disabled={disabled}
                className={classes}
                data-testid="textarea"
                {...rest}
            >
                {children}
            </SemanticTextArea>
        </Ref>
    );
}

PureTextArea.propTypes = propTypes;
PureTextArea.defaultProps = defaultProps;

export const TextArea = forwardRef((props, ref) => (
    <PureTextArea { ...props } forwardedRef={ref} />
));
