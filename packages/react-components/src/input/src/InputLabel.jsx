import "./InputLabel.css";

import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { getSizeClass, mergeClasses } from "../../shared";

const propTypes = {
    required: bool,
    size: oneOf(["small", "medium", "large"]),
    as: oneOfType([string, elementType]),
    children: any.isRequired
};

const defaultProps = {
    as: "label"
};

export function InnerInputLabel({
    required,
    size,
    as: ElementType,
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const label = required ? `${children} *` : children;

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui label",
                required && "required",
                getSizeClass(size),
                className
            )}
            ref={forwardedRef}
        >
            {label}
        </ElementType>
    );
}

InnerInputLabel.propTypes = propTypes;
InnerInputLabel.defaultProps = defaultProps;

export const InputLabel = forwardRef((props, ref) => (
    <InnerInputLabel { ...props } forwardedRef={ref} />
));
