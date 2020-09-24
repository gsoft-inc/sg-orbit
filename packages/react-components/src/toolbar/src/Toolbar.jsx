import { Flex } from "../../layout";
import { KEYS, useArrowNavigation, useAutoFocusFirstTabbableElement, useMergedRefs, useRovingFocus } from "../../shared";
import { ToolbarContext } from "./ToolbarContext";
import { any, bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";

const ARROW_NAV_KEY_BINDING = {
    previous: [KEYS.left],
    next: [KEYS.right],
    first: [KEYS.home],
    last: [KEYS.end]
};

const propTypes = {
    /**
     * Whether the toolbar should autoFocus the first tabbable element on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * How the elements are aligned in the container along the main axis.
     */
    align: oneOf(["start", "end", "center"]),
    /**
     * How the elements are aligned in the container along the cross axis.
     */
    justify: oneOf(["start", "end", "center"]),
    /**
     * Flex direction to display the elements.
     */
    orientation: oneOf(["horizontal", "vertical"]),
    /**
     * The space between elements.
     */
    gap: oneOfType([oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]), string]),
    /**
     * Whether elements are forced onto one line or can wrap onto multiple lines
     */
    wrap: bool,
    /**
     * Element size.
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
    align,
    justify,
    orientation = "horizontal",
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

    const arrowNavigationProps = useArrowNavigation(ARROW_NAV_KEY_BINDING);

    return (
        <Flex
            data-testid="toolbar"
            {...rest}
            {...arrowNavigationProps}
            role="toolbar"
            alignItems={align}
            justifyContent={justify}
            direction={orientation === "vertical" ? "column" : "row"}
            gap={gap}
            wrap={!isNil(wrap) ? "wrap" : undefined}
            aria-orientation={orientation}
            as={as}
            ref={ref}
        >
            <ToolbarContext.Provider
                value={{
                    orientation,
                    size,
                    disabled
                }}
            >
                {children}
            </ToolbarContext.Provider>
        </Flex>
    );
}

InnerToolbar.propTypes = propTypes;

export const Toolbar = forwardRef((props, ref) => (
    <InnerToolbar {...props} forwardedRef={ref} />
));
