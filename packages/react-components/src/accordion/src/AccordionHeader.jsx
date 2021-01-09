import "./Accordion.css";

import { DisclosureArrow } from "../../disclosure";
import { Heading } from "../../heading";
import { Text } from "../../text";
import { adaptSize, cssModule, mergeClasses, normalizeSize, omitProps, useSlots } from "../../shared";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";

const propTypes = {
    /**
     * An accordion header can vary in size.
     */
    size: oneOf(["sm", "md"]),
    /**
     * Whether or not the tab is disabled.
     */
    disabled: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerAccordionHeader(props) {
    const {
        size,
        disabled,
        active,
        focus,
        hover,
        as,
        className,
        children,
        forwardedRef,
        ...rest
    } = omitProps(props, ["header"]);

    if (isNil(as)) {
        throw new Error("An accordion header must receive an \"as\" prop matching a valid heading type.");
    }

    const { icon, text } = useSlots(children, {
        _: {
            defaultWrapper: Text
        },
        icon: {
            size,
            className: "o-ui-accordion-icon"
        },
        text: {
            size: "inherit",
            className: "o-ui-accordion-title"
        }
    });

    return (
        <Heading
            size={adaptSize(size, {
                "sm": "xs",
                "md": "sm"
            })}
            className={cssModule(
                "o-ui-accordion-header",
                normalizeSize(size)
            )}
            as={as}
            ref={forwardedRef}
        >
            <button
                {...rest}
                className={mergeClasses(
                    cssModule(
                        "o-ui-accordion-trigger",
                        active && "active",
                        focus && "focus",
                        hover && "hover",
                        icon && "has-icon"
                    ),
                    className
                )}
                type="button"
                disabled={disabled}
            >
                {icon}
                {text}
                <DisclosureArrow
                    size={size}
                    className="o-ui-accordion-arrow"
                />
            </button>
        </Heading>
    );
}

InnerAccordionHeader.propTypes = propTypes;

export const AccordionHeader = forwardRef((props, ref) => (
    <InnerAccordionHeader {...props} forwardedRef={ref} />
));

AccordionHeader.displayName = "AccordionHeader";
