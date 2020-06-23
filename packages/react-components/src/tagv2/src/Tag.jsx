import { EmbeddedIcon } from "../../icons";
import { any, bool, element, elementType, object, oneOf, oneOfType, string } from "prop-types";
import { createEmbeddedButton } from "../../button";
import { embedBadge } from "../../badge";
import { forwardRef } from "react";
import { getSizeClass, mergeClasses } from "../../shared";
import { isNil } from "lodash";

const propTypes = {
    /**
     * A tag can reduce its complexity.
     */
    basic: bool,
    /**
     * A tag can be compact.
     */
    compact: bool,
    /**
     * [Button](/?path=/docs/components-button--default-story) component to display after the text.
     */
    button: oneOfType([element, object]),
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component to display before or after the text.
     */
    icon: element,
    /**
     * An icon can appear on the left or right.
     */
    iconPosition: oneOf(["left", "right"]),
    /**
     * Dot variant of a badge to display before the text.
     */
    dot: oneOfType([element, object]),
    /**
     * A tag can vary in sizes.
     */
    size: oneOf(["small", "medium", "large"]),
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
    iconPosition: "left",
    as: "div"
};

function throwWhenMutuallyExclusivePropsAreProvided({ button, icon, iconPosition, dot }) {
    if (!isNil(button) && !isNil(icon) && iconPosition === "right") {
        throw new Error("@orbit-ui/react-components/Tag doesn't support having a button and a right positioned icon at the same time.");
    }

    if (!isNil(dot) && !isNil(icon) && iconPosition === "left") {
        throw new Error("@orbit-ui/react-components/Tag doesn't support having a dot badge and a left positioned icon at the same time.");
    }
}

export function InnerTag(props) {
    const { basic, compact, button, icon, iconPosition, dot, disabled, size, as: Element, className, children, forwardedRef, ...rest } = props;

    throwWhenMutuallyExclusivePropsAreProvided(props);

    const iconMarkup = !isNil(icon) && (
        <EmbeddedIcon icon={icon} size={size} />
    );

    const buttonMarkup = !isNil(button) && createEmbeddedButton(button, {
        size,
        circular: true,
        ghost: true,
        secondary: true
    });

    const dotMarkup = !isNil(dot) && embedBadge(dot, {
        dot: true,
        size
    });

    const content = (
        <>
            {iconPosition === "left" && iconMarkup}{dotMarkup}
            {children}
            {iconPosition === "right" && iconMarkup}{buttonMarkup}
        </>
    );

    return (
        <Element
            {...rest}
            className={mergeClasses(
                "ui label",
                basic && "basic",
                compact && "compact",
                disabled && "disabled",
                !isNil(button) && "with-button",
                !isNil(iconMarkup) && iconPosition === "left" && "with-left-icon",
                !isNil(iconMarkup) && iconPosition === "right" && "with-right-icon",
                !isNil(dot) && "with-dot",
                getSizeClass(size),
                className
            )}
            ref={forwardedRef}
        >
            {content}
        </Element>
    );
}

InnerTag.propTypes = propTypes;
InnerTag.defaultProps = defaultProps;

export const Tag = forwardRef((props, ref) => (
    <InnerTag { ...props } forwardedRef={ref} />
));

