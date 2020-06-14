import { SemanticRef, mergeClasses, useAutofocus, useMergedRefs } from "../../shared";
import { TextArea as SemanticTextArea } from "semantic-ui-react";
import { bool, number, oneOf, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";

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
    size: oneOf(["small", "medium", "large"]),
    /**
     * Whether or not the textarea take up the width of its container
     */
    fluid: bool,
    /**
     * A textarea can show that the data contains errors.
     */
    error: bool,
    /**
     * Whether or not the textarea is transparent.
     */
    transparent: bool,
    /**
     * Whether or not the textarea is resizable.
     */
    resizable: bool
};

export function InnerTextArea(props) {
    const { autofocus, autofocusDelay, size, error, fluid, transparent, resizable, active, focus, hover, disabled, className, children, forwardedRef, ...rest } = props;

    const innerRef = useMergedRefs(forwardedRef);

    const setFocus = () => {
        if (!isNil(innerRef.current)) {
            innerRef.current.focus();
        }
    };

    const autofocusProps = useAutofocus(autofocus, autofocusDelay, disabled, setFocus);

    return (
        <SemanticRef innerRef={innerRef}>
            <SemanticTextArea
                data-testid="textarea"
                {...rest}
                {...autofocusProps}
                disabled={disabled}
                className={mergeClasses(
                    "ui textarea",
                    error && "error",
                    fluid && "fluid",
                    active && "active",
                    focus && "focus",
                    hover && "hover",
                    transparent && "transparent",
                    resizable && "resizable",
                    size && size,
                    className
                )}
            >
                {children}
            </SemanticTextArea>
        </SemanticRef>
    );
}

InnerTextArea.propTypes = propTypes;

export const TextArea = forwardRef((props, ref) => (
    <InnerTextArea { ...props } forwardedRef={ref} />
));
