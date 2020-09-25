import "./BodyText.css";

import { ClearSlots, SlotProvider, cssModule, getSizeClass, mergeClasses } from "../../shared";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { linkSlot } from "../../link";

const propTypes = {
    /**
     * A text can vary in size.
     */
    size: oneOf(["xs", "sm", "md", "lg", "xl", "2xl"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerBodyText({
    size,
    as: ElementType = "span",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-body-text",
                    getSizeClass(size)
                ),
                className
            )}
            ref={forwardedRef}
        >
            <ClearSlots>
                <SlotProvider
                    slots={{
                        link: linkSlot()
                    }}
                >
                    {children}
                </SlotProvider>
            </ClearSlots>
        </ElementType>
    );
}

InnerBodyText.propTypes = propTypes;

export const BodyText = forwardRef((props, ref) => (
    <InnerBodyText {...props} forwardedRef={ref} />
));

