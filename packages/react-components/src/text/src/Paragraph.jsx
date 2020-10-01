import "./Paragraph.css";

import { ClearSlots, SlotProvider, cssModule, getSizeClass, mergeClasses, mergeProps, useSlot } from "../../shared";
import { Text } from "./Text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * A paragraph can vary in size.
     */
    size: oneOf(["xs", "sm", "md", "lg", "xl", "2xl"]),
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

export function InnerParagraph(props) {
    const {
        size,
        as = "p",
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        useSlot(props, "paragraph")
    );

    return (
        <Text
            {...rest}
            size={size}
            className={mergeClasses(
                cssModule(
                    "o-ui-p",
                    getSizeClass(size)
                ),
                className
            )}
            as={as}
            ref={forwardedRef}
        >
            <ClearSlots>
                <SlotProvider
                    slots={{
                        link: {
                            size,
                            underline: "dotted"
                        }
                    }}
                >
                    {children}
                </SlotProvider>
            </ClearSlots>
        </Text>
    );
}

InnerParagraph.propTypes = propTypes;

export const Paragraph = forwardRef((props, ref) => (
    <InnerParagraph {...props} forwardedRef={ref} />
));

