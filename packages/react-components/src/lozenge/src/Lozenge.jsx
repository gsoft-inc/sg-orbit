import "./Lozenge.css";

import { EmbeddedIcon } from "../../icons";
import { any, element, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { getSizeClass, mergeClasses } from "../../shared";
import { isNil } from "lodash";

const propTypes = {
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before the text.
     */
    icon: element,
    /**
     * A lozenge can vary in size.
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

export function InnerLozenge({
    icon,
    size,
    as: ElementType,
    className,
    children,
    as = "span",
    forwardedRef,
    ...rest
}) {
    const textMarkup = (
        <span className="text">{children}</span>
    );

    const iconMarkup = !isNil(icon) && (
        <EmbeddedIcon size={size}>{icon}</EmbeddedIcon>
    );

    const content = (
        <>
            {iconMarkup}
            {textMarkup}
        </>
    );

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui lozenge",
                getSizeClass(size),
                className
            )}
            as={as}
            ref={forwardedRef}
        >
            {content}
        </ElementType>
    );
}

InnerLozenge.propTypes = propTypes;

export const Lozenge = forwardRef((props, ref) => (
    <InnerLozenge {...props} forwardedRef={ref} />
));
