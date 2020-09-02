import "./InputLabel.css";

import { EmbeddedIcon, InfoIcon } from "@react-components/icons";
import { Tooltip } from "@react-components/tooltip";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { cssModule, getSizeClass3, mergeClasses } from "../../shared";
import { forwardRef } from "react";

const propTypes = {
    required: bool,
    size: oneOf(["small", "medium", "large"]),
    as: oneOfType([string, elementType]),
    children: any.isRequired
};

export function InnerInputLabel({
    required,
    description,
    size,
    as: ElementType = "label",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const label = required ? `${children} *` : children;

    const descriptionMarkup = description && (
        <Tooltip
            content={description}
            trigger={<EmbeddedIcon size={size}><InfoIcon className="input-description" /></EmbeddedIcon>}
            size={size}
        />
    );

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule("o-ui-input-label",
                          required && "required",
                          descriptionMarkup && "with-description",
                          getSizeClass3(size)
                ),
                className
            )}
            ref={forwardedRef}
        >
            {label}
            {descriptionMarkup}
        </ElementType>
    );
}

InnerInputLabel.propTypes = propTypes;

export const InputLabel = forwardRef((props, ref) => (
    <InnerInputLabel {...props} forwardedRef={ref} />
));
