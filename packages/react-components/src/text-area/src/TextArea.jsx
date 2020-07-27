import { SemanticRef, mergeClasses, useAutoFocus, useMergedRefs } from "../../shared";
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
     * Whether or not the textarea should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
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
    const { autoFocus, autoFocusDelay, size, error, fluid, transparent, resizable, active, focus, hover, disabled, className, children, forwardedRef, ...rest } = props;

    const innerRef = useMergedRefs(forwardedRef);

    const setFocus = () => {
        if (!isNil(innerRef.current)) {
            innerRef.current.focus();
        }
    };

    const autoFocusProps = useAutoFocus(autoFocus, autoFocusDelay, disabled, setFocus);

    return (
        <SemanticRef innerRef={innerRef}>
            <SemanticTextArea
                data-testid="textarea"
                {...rest}
                {...autoFocusProps}
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
