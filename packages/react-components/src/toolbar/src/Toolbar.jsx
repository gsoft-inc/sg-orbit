import { Flex, useFlexAlignment, useFlexDirection } from "../../layout";
import { Keys, mergeProps, useAutoFocusChild, useBasicKeyboardNavigation, useFocusManager, useFocusScope, useMergedRefs, useRovingFocus } from "../../shared";
import { ToolbarContext } from "./ToolbarContext";
import { any, bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil, isNumber } from "lodash";

const propTypes = {
    /**
     * Whether or not the toolbar should autoFocus the first tabbable element on render.
     */
    autoFocus: oneOfType([bool, number]),
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
     * Whether or not the elements are forced onto one line or can wrap onto multiple lines
     */
    wrap: bool,
    /**
     * Whether the toolbar take up the width of its container.
     */
    fluid: bool,
    /**
     * Whether or not the toolbar elements are disabled.
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

const NavigationKeyBinding = {
    horizontal: {
        previous: [Keys.left],
        next: [Keys.right],
        first: [Keys.home],
        last: [Keys.end]
    },
    vertical: {
        previous: [Keys.up],
        next: [Keys.down],
        first: [Keys.home],
        last: [Keys.end]
    }
};

export function InnerToolbar({
    autoFocus,
    orientation = "horizontal",
    align,
    verticalAlign,
    gap = 5,
    wrap,
    disabled,
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    const [focusScope, setFocusRef] = useFocusScope();

    const containerRef = useMergedRefs(setFocusRef, forwardedRef);

    const focusManager = useFocusManager(focusScope);

    useRovingFocus(focusScope);

    useAutoFocusChild(focusManager, {
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const arrowNavigationProps = useBasicKeyboardNavigation(focusManager, NavigationKeyBinding[orientation]);

    const directionProps = useFlexDirection(orientation);

    const alignProps = useFlexAlignment(
        orientation,
        align,
        orientation === "horizontal"
            ? verticalAlign ?? "center"
            : verticalAlign
    );

    return (
        <Flex
            {...mergeProps(
                rest,
                directionProps,
                alignProps,
                arrowNavigationProps
            )}
            role="toolbar"
            gap={gap}
            wrap={!isNil(wrap) ? "wrap" : undefined}
            as={as}
            ref={containerRef}
            aria-orientation={orientation}
        >
            <ToolbarContext.Provider
                value={{
                    orientation,
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

Toolbar.displayName = "Toolbar";
