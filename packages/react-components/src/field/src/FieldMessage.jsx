import { SIZE, SlotProvider, createSizeAdapterSlotFactory, cssModule, getSizeClass, mergeClasses } from "../../shared";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { textSlot } from "../../text";

const propTypes = {
    variant: oneOf(["help", "valid", "error"]).isRequired,
    size: oneOf(["small", "medium", "large"]),
    as: oneOfType([string, elementType]),
    children: any.isRequired
};

const textSlotAdapter = createSizeAdapterSlotFactory({
    [SIZE.small]: SIZE.tiny,
    [SIZE.medium]: SIZE.small,
    [SIZE.large]: SIZE.medium
});

export const FieldMessage = forwardRef(({
    variant,
    size,
    className,
    as: ElementType = "span",
    children,
    ...rest
}, ref) => {
    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-field-message",
                    variant,
                    getSizeClass(size)
                ),
                className
            )}
            aria-live="polite"
            ref={ref}
        >
            <SlotProvider
                slots={{
                    text: textSlot(textSlotAdapter({
                        size
                    })),
                    icon: {
                        size
                    }
                }}
            >
                {children}
            </SlotProvider>
        </ElementType>
    );
});

FieldMessage.propTypes = propTypes;
