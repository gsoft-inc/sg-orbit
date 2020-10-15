import { Flex, toFlexDirection, useFlexAlignment } from "../../layout";
import { KEYS, useAutoFocusFirstTabbableElement, useKeyboardNavigation, useMergedRefs, useRovingFocus } from "../../shared";
import { ToolbarProvider } from "./ToolbarContext";
import { any, bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";

const propTypes = {
    /**
     * Whether the toolbar should autoFocus the first tabbable element on render.
     */
    autoFocus: bool,
    /**
     * The delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * The orientation of the elements.
     */
    orientation: oneOf(["horizontal", "vertical"]),
    /**
     * The horizontal alignment of the elements.
     */
    align: oneOf(["start", "end", "center"]),
    /**
     * The vertical alignment of the elements.
     */
    verticalAlign: oneOf(["start", "end", "center"]),
    /**
     * The space between the elements.
     */
    gap: oneOfType([oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]), string]),
    /**
     * Whether the elements are forced onto one line or can wrap onto multiple lines
     */
    wrap: bool,
    /**
     * The size of the elements.
     */
    size: oneOf(["sm", "md", "lg"]),
    /**
     * Whether the toolbar take up the width of its container.
     */
    fluid: bool,
    /**
     * Whether the toolbar elements are disabled.
     */
    disabled: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerToolbar({
    autoFocus,
    autoFocusDelay,
    orientation = "horizontal",
    align,
    verticalAlign,
    gap = 5,
    wrap,
    size,
    disabled,
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    const ref = useMergedRefs(forwardedRef);

    useRovingFocus(ref);

    useAutoFocusFirstTabbableElement(ref, autoFocus, { delay: autoFocusDelay });

    const alignProps = useFlexAlignment(orientation, align, orientation === "horizontal" ? verticalAlign ?? "center" : verticalAlign);

    const arrowNavigationProps = useKeyboardNavigation({
        previous: orientation === "horizontal" ? [KEYS.left] : [KEYS.left, KEYS.up],
        next: orientation === "horizontal" ? [KEYS.right] : [KEYS.right, KEYS.down],
        first: [KEYS.home],
        last: [KEYS.end]
    });

    return (
        <Flex
            data-testid="toolbar"
            {...rest}
            {...alignProps}
            {...arrowNavigationProps}
            role="toolbar"
            direction={toFlexDirection(orientation)}
            gap={gap}
            wrap={!isNil(wrap) ? "wrap" : undefined}
            as={as}
            ref={ref}
            aria-orientation={orientation}
        >
            <ToolbarProvider
                value={{
                    orientation,
                    size,
                    disabled
                }}
            >
                {children}
            </ToolbarProvider>
        </Flex>
    );
}

InnerToolbar.propTypes = propTypes;

export const Toolbar = forwardRef((props, ref) => (
    <InnerToolbar {...props} forwardedRef={ref} />
));
