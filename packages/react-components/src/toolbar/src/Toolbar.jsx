import { Children, forwardRef, useRef } from "react";
import { Flex } from "../../layout";
import { KEYS, augmentElement, mergeClasses, useArrowNavigation, useAutoFocusFirstTabbableElement, useRovingFocus } from "../../shared";
import { ToolbarContext } from "./ToolbarContext";
import { any, bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { isNil } from "lodash";

const ARROW_NAV_KEY_BINDING = {
    previous: [KEYS.left],
    next: [KEYS.right],
    first: [KEYS.home],
    last: [KEYS.end]
};

const propTypes = {
    /**
     * Whether or not the radio group should autoFocus on render.
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
     * Flex direction to display the children.
     */
    orientation: oneOf(["horizontal", "vertical"]),
    /**
     * The space between element groups.
     */
    gap: oneOfType([oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]), string]),
    /**
     * Whether or not elements are forced onto one line or can wrap onto multiple lines
     */
    wrap: bool,
    /**
     * Children size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * Whether or not the toolbar take up the width of its container.
     */
    fluid: bool,
    /**
   * An HTML element type or a custom React element type to render as.
   */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

const defaultProps = {
    orientation: "horizontal",
    gap: 5,
    as: "div"
};

export function InnerToolbar({
    autoFocus,
    autoFocusDelay,
    align,
    justify,
    orientation,
    wrap,
    size,
    fluid,
    className,
    children,
    ...rest
}) {
    const ref = useRef();

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
            wrap={!isNil(wrap) ? "wrap" : undefined}
            className={mergeClasses(
                "o-ui toolbar",
                fluid && "fluid",
                className
            )}
            aria-orientation={orientation}
            ref={ref}
        >
            <ToolbarContext.Provider
                value={{
                    orientation
                }}
            >
                {Children.map(children, x => {
                    return x && augmentElement(x, {
                        size
                    });
                })}
            </ToolbarContext.Provider>
        </Flex>
    );
}

InnerToolbar.propTypes = propTypes;
InnerToolbar.defaultProps = defaultProps;

export const Toolbar = forwardRef((props, ref) => (
    <InnerToolbar { ...props } forwardedRef={ref} />
));
