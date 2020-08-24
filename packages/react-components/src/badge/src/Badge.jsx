import "./Badge.css";

import { EmbeddedText } from "../../text";
import { any, element, elementType, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, getSizeClass, mergeClasses } from "../../shared";
import { forwardRef } from "react";

const propTypes = {
    /**
     * The badge content.
     */
    content: oneOfType([string, element]),
    /**
     * Style to use.
     */
    variant: oneOf(["pill", "dot", "icon"]),
    /**
     * The shape of the element being overlap by the badge.
     */
    overlap: oneOf(["rectangle", "circle"]),
    /**
     * A badge can vary in size.
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
    variant: "pill",
    overlap: "rectangle",
    as: "span"
};

export function InnerBadge({ content, variant, overlap, size, as: ElementType, className, children, forwardedRef, ...rest }) {
    let badgeContent;

    if (variant === "icon") {
        badgeContent = augmentElement(content, {
            size
        });
    } else {
        badgeContent = content && (
            <EmbeddedText size={size}>
                {content}
            </EmbeddedText>
        );
    }

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui badge",
                className
            )}
            ref={forwardedRef}
        >
            <span
                className={mergeClasses(
                    variant && `${variant}-badge`,
                    variant === "dot" && !badgeContent && "empty",
                    overlap && `overlap-${overlap}`,
                    getSizeClass(size)
                )}
            >
                {badgeContent}
            </span>
            {children}
        </ElementType>
    );
}

InnerBadge.propTypes = propTypes;
InnerBadge.defaultProps = defaultProps;

export const Badge = forwardRef((props, ref) => (
    <InnerBadge {...props} forwardedRef={ref} />
));
