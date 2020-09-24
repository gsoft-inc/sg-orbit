import "./Paragraph.css";

import { ClearSlots, SlotProvider, cssModule, getSizeClass, mergeClasses } from "../../shared";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { linkSlot } from "../../link";

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
     * @ignore
     */
    children: any.isRequired
};

export function InnerParagraph({
    size,
    as: ElementType = "p",
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
                    "o-ui-p",
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

InnerParagraph.propTypes = propTypes;

export const Paragraph = forwardRef((props, ref) => (
    <InnerParagraph {...props} forwardedRef={ref} />
));

