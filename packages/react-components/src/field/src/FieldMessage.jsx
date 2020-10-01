import "./FieldMessage.css";

import { ClearSlots, SlotProvider, cssModule, getSize, getSizeClass, mergeClasses } from "../../shared";
import { Text } from "../../text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { embeddedIconSlot } from "../../icons";
import { forwardRef } from "react";

export function getValidationProps(validationState) {
    const isValid = validationState === "valid";
    const isError = validationState === "invalid";

    return {
        isHelp: !isValid && !isError,
        isValid,
        isError
    };
}

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["neutral", "success", "error"]).isRequired,
    /**
     * A message can vary in size.
     */
    size: oneOf(["sm", "md", "lg"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

const ADAPTED_SIZE = {
    "sm": "xs",
    "md": "sm",
    "lg": "md"
};

export const FieldMessage = forwardRef(({
    variant,
    fluid,
    size,
    as = "div",
    className,
    children,
    ...rest
}, ref) => {
    return (
        <Text
            data-testid="field-message"
            {...rest}
            size={ADAPTED_SIZE[getSize(size)]}
            className={mergeClasses(
                cssModule(
                    "o-ui-field-message",
                    variant,
                    fluid && "fluid",
                    getSizeClass(size)
                ),
                className
            )}
            as={as}
            ref={ref}
        >
            <ClearSlots>
                <SlotProvider
                    slots={{
                        text: {
                            size: "inherit"
                        },
                        p: {
                            size: "inherit"
                        },
                        list: {
                            size: "inherit"
                        },
                        icon: embeddedIconSlot({
                            size
                        }),
                        link: {
                            size: "inherit",
                            underline: "dotted"
                        }
                    }}
                >
                    {children}
                </SlotProvider>
            </ClearSlots>
        </Text>
    );
});

FieldMessage.propTypes = propTypes;
