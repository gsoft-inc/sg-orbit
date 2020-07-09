import { AutoControlledPopperContext } from "./AutoControlledPopperContext";
import { Popper } from "./Popper";
import { array, arrayOf, bool, instanceOf, number, object, oneOf } from "prop-types";
import { forwardRef, useContext } from "react";
import { useMergedRefs } from "../../shared";

// TODO: Should be a subset of the Popper interface when we switch to TS.
const propTypes = {
    /**
     * Position of the popper element.
     */
    position: oneOf([
        "auto",
        "auto-start",
        "auto-end",
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "right",
        "right-start",
        "right-end",
        "left",
        "left-start",
        "left-end"
    ]),
    /**
     * When true, disables automatic repositioning of the component, it will always be placed according to the position value.
     */
    pinned: bool,
    /**
     * Whether or not to render the popper element in an additional element that will handles [Popper.js](https://popper.js.org) references, attributes and styles.
     */
    noWrap: bool,
    /**
     * Allow to displace the popper element from its trigger element.
     * Ex: `[10, -10]`
     */
    offset: arrayOf(number),
    /**
     * An array of modifiers passed directly to [Popper.js](https://popper.js.org) modifiers. For more info, view [Popper.js modifiers documentation](https://popper.js.org/docs/v2/modifiers).
     */
    popperModifiers: array,
    /**
     * A set of options passed directly to [Popper.js](https://popper.js.org). For more info, view [Popper.js options documentation](https://popper.js.org/docs/v2/constructors/#options).
     */
    popperOptions: object,
    /**
     * A DOM element in which the popper element will appended via a React portal.
     */
    portalContainerElement: instanceOf(HTMLElement),
    /**
     * z-index of the popper.
     */
    zIndex: number,
    /**
     * Whether or not to render the popper element with React portal. The popper element will be rendered within it's parent DOM hierarchy.
     */
    noPortal: bool,
    /**
     * Whether or not to animate the popper element when opening / closing.
     */
    animate: bool
};

export function InnerAutoControlledPopperAdapter({ children, forwardedRef, ...rest }) {
    const { isVisible, triggerElement, popperRef } = useContext(AutoControlledPopperContext);

    const ref = useMergedRefs(popperRef, forwardedRef);

    return (
        <Popper
            {...rest}
            show={isVisible}
            triggerElement={triggerElement}
            ref={ref}
        >
            {children}
        </Popper>
    );
}

InnerAutoControlledPopperAdapter.propTypes = propTypes;

export const AutoControlledPopperAdapter = forwardRef((props, ref) => (
    <InnerAutoControlledPopperAdapter {...props} forwardedRef={ref} />
));

