import { SemanticRef, mergeClasses, useAutofocus, useCombinedRefs } from "../../shared";
import { TextArea as SemanticTextArea } from "semantic-ui-react";
import { bool, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";

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
     * Whether or not the select appear as focused.
     */
    focus: bool,
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
    focus: false,
    transparent: false,
    resizable: false,
    disabled: false,
    size: DEFAULT_SIZE
};

function useSetFocus(textAreaRef) {
    return () => {
        if (!isNil(textAreaRef.current)) {
            textAreaRef.current.focus();
        }
    };
}

function useRenderer({ size, error, fluid, focus, transparent, resizable, disabled, className, children, rest }, autofocusProps, innerRef) {
    return () => {
        const classes = mergeClasses(
            "ui textarea",
            error && "error",
            fluid && "fluid",
            focus && "focus",
            transparent && "transparent",
            resizable && "resizable",
            size && size,
            className
        );

        return (
            <SemanticRef innerRef={innerRef}>
                <SemanticTextArea
                    data-testid="textarea"
                    {...rest}
                    {...autofocusProps}
                    disabled={disabled}
                    className={classes}
                >
                    {children}
                </SemanticTextArea>
            </SemanticRef>
        );
    };
}

export function InnerTextArea(props) {
    const { autofocus, autofocusDelay, size, error, fluid, focus, transparent, resizable, disabled, className, children, forwardedRef, ...rest } = props;

    const innerRef = useCombinedRefs(forwardedRef);

    const setFocus = useSetFocus(innerRef);
    const autofocusProps = useAutofocus(autofocus, autofocusDelay, disabled, setFocus);

    const render = useRenderer({ size, error, fluid, focus, transparent, resizable, disabled, className, children, rest }, autofocusProps, innerRef);

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

InnerTextArea.propTypes = propTypes;
InnerTextArea.defaultProps = defaultProps;

export const TextArea = forwardRef((props, ref) => (
    <InnerTextArea { ...props } forwardedRef={ref} />
));
