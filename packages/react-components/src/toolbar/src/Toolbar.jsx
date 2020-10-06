import { Flex, toFlexDirection } from "../../layout";
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
     * The delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * The orientation of the elements.
     */
    orientation: oneOf(["horizontal", "vertical"]),
    /**
     * The alignment of the elements within the toolbar. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
     */
    align: oneOf(["start", "end", "center"]),
    /**
     * The distribution of space around the elements along the main axis. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
     */
    justify: oneOf(["start", "end", "center"]),
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

function useFlexAlignment(orientation, align, justify) {
    return {
        alignItems: orientation === "horizontal"
            ? align ?? "center"
            : align,
        justifyContent: justify
    };
}

export function InnerToolbar({
    autoFocus,
    autoFocusDelay,
    orientation = "horizontal",
    align,
    justify,
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

    const alignProps = useFlexAlignment(orientation, align, justify);
    const arrowNavigationProps = useArrowNavigation(ARROW_NAV_KEY_BINDING);

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
