import "./Badge.css";

import { Children, forwardRef } from "react";
import { SlotProvider, getSizeClass, mergeClasses } from "../../shared";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { isUndefined } from "lodash";
import { textSlot } from "../../text";

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["pill", "dot", "icon"]),
    /**
     * The shape of the element being overlap by the badge.
     */
    overlap: oneOf(["rectangle", "circle", "icon"]),
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

export function InnerBadge({ variant, overlap, size, as: ElementType, className, children, forwardedRef, ...rest }) {
    let [badgeContent, overlappedElement] = Children.toArray(children);

    const isEmpty = isUndefined(overlappedElement);

    if (isEmpty) {
        overlappedElement = badgeContent;
        badgeContent = undefined;
    }

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui-badge",
                className
            )}
            ref={forwardedRef}
        >
            <SlotProvider
                slots={{
                    text: textSlot({
                        size
                    }),
                    icon: {
                        size
                    }
                }}
            >
                <div
                    className={mergeClasses(
                        "o-ui-badge__anchor",
                        `o-ui-badge__${variant}`,
                        variant === "dot" && isEmpty && "o-ui-badge__dot--empty",
                        overlap && `o-ui-badge__anchor--over-${overlap}`,
                        getSizeClass(size, "o-ui-badge--")
                    )}
                >
                    {badgeContent}
                </div>
            </SlotProvider>
            {overlappedElement}
        </ElementType>
    );
}

InnerBadge.propTypes = propTypes;
InnerBadge.defaultProps = defaultProps;

export const Badge = forwardRef((props, ref) => (
    <InnerBadge {...props} forwardedRef={ref} />
));
