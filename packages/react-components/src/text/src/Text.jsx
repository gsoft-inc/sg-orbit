import "./Text.css";

import { ClearSlots, SlotProvider, cssModule, getSizeClass, mergeClasses, useSlotProps } from "../../shared";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * A text can vary in size.
     */
    size: oneOf(["mini", "tiny", "small", "medium", "large"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Default slot override.
     */
    slot: string,
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerText(props) {
    const {
        size,
        as: ElementType = "span",
        className,
        children,
        forwardedRef,
        ...rest
    } = useSlotProps(props, "text");

    return (
        <ElementType
            data-testid="text"
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-text",
                    getSizeClass(size)
                ),
                className
            )}
            ref={forwardedRef}
        >
            <ClearSlots>
                <SlotProvider
                    slots={{
                        icon: {
                            size
                        }
                    }}
                >
                    {children}
                </SlotProvider>
            </ClearSlots>
        </ElementType>
    );
}

InnerText.propTypes = propTypes;

export const Text = forwardRef((props, ref) => (
    <InnerText {...props} forwardedRef={ref} />
));

export const textSlot = props => props;
