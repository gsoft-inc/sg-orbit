import "./InputLabel.css";

import { EmbeddedIcon, InfoIcon } from "@react-components/icons";
import { EmbeddedText } from "../../text";
import { Tooltip } from "@react-components/tooltip";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { cssModule, getSizeClass, mergeClasses } from "../../shared";
import { forwardRef } from "react";

const propTypes = {
    required: bool,
    size: oneOf(["small", "medium", "large"]),
    as: oneOfType([string, elementType]),
    children: any.isRequired
};

// TODO: Use Label instead of Text.

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
            trigger={
                <EmbeddedIcon size={size}>
                    <InfoIcon className="o-ui-input-description" />
                </EmbeddedIcon>
            }
            size={size}
        />
    );

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-input-label",
                    required && "required",
                    descriptionMarkup && "has-description",
                    getSizeClass(size)
                ),
                className
            )}
            ref={forwardedRef}
        >
            <EmbeddedText size={size}>
                {label}
            </EmbeddedText>
            {descriptionMarkup}
        </ElementType>
    );
}

InnerInputLabel.propTypes = propTypes;

export const InputLabel = forwardRef((props, ref) => (
    <InnerInputLabel {...props} forwardedRef={ref} />
));
