import { any, bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useCallback } from "react";
import { getSizeClass, mergeClasses, useAutofocus, useMergedRefs } from "../../shared";
import { isNil } from "lodash";

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["solid", "outline", "ghost"]),
    /**
     * Color accent to use.
     */
    color: oneOf(["primary", "secondary"]),
    /**
     * Whether or not the button should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * A button can have a circular form.
     */
    circular: bool,
    /**
     * A button can show a loading indicator.
     */
    loading: bool,
    /**
     * A button can vary in sizes.
     */
    size: oneOf(["mini", "tiny", "small", "medium", "large"]),
    /**
     * The button type.
     */
    type: oneOf(["button", "submit", "reset"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

const defaultProps = {
    variant: "solid",
    type: "button",
    as: "button"
};

export function InnerIconButton({
    variant,
    color,
    autofocus,
    autofocusDelay,
    fluid,
    circular,
    loading,
    size,
    active,
    focus,
    hover,
    disabled,
    as: ElementType,
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const ref = useMergedRefs(forwardedRef);

    const setFocus = useCallback(() => {
        if (!isNil(ref.current)) {
            ref.current.focus();
        }
    }, [ref]);

    const autofocusProps = useAutofocus(autofocus, autofocusDelay, disabled, setFocus);

    return (
        <ElementType
            data-testid="icon-button"
            {...rest}
            {...autofocusProps}
            className={mergeClasses(
                "o-ui button icon",
                variant,
                color && color,
                fluid && "fluid",
                circular && "circular",
                loading && "loading",
                active && "active",
                focus && "focus",
                hover && "hover",
                getSizeClass(size),
                className
            )}
            disabled={disabled}
            ref={ref}
        >
            {children}
        </ElementType>
    );
}

InnerIconButton.propTypes = propTypes;
InnerIconButton.defaultProps = defaultProps;

export const IconButton = forwardRef((props, ref) => (
    <InnerIconButton { ...props } forwardedRef={ref} />
));


