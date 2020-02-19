import { Ref, TextArea as SemanticTextArea } from "semantic-ui-react";
import { bool, func, number, object, oneOf, oneOfType } from "prop-types";
import { forwardRef, useEffect } from "react";
import { isNil } from "lodash";
import { mergeClasses, useForwardRef } from "@orbit-ui/react-components-shared";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

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
     * Whether or not the textarea take up the width of its container
     */
    fluid: bool,
    /**
     * A textarea can show that the data contains errors.
     */
    error: bool,
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
    fluid: false,
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
    const { autofocus, autofocusDelay, className, disabled, error, fluid, focused, transparent, size, children, forwardedRef, ...rest } = props;

    const [ref, setRef] = useForwardRef(forwardedRef);
    const shouldAutofocus = autofocus && !disabled && isNil(autofocusDelay);

    useDelayedAutofocus(autofocus, autofocusDelay, disabled, ref);

    const classes = mergeClasses(
        "ui textarea",
        error && "error",
        fluid && "fluid",
        focused && "focus",
        transparent && "transparent",
        size && size,
        className
    );

    return (
        <Ref innerRef={setRef}>
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
