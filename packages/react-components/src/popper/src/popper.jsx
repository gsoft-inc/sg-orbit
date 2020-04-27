import "./popper.css";

import { Children, cloneElement, forwardRef, useCallback, useState } from "react";
import { POSITIONS } from "./positions";
import { array, arrayOf, bool, func, instanceOf, node, number, object, oneOf, oneOfType, string } from "prop-types";
import { assignRef, mergeClasses, useResizeObserver } from "../../shared";
import { createPortal } from "react-dom";
import { isNil, merge } from "lodash";
import { usePopper } from "react-popper";

// USAGE:
// Trigger:
//    - The trigger must accept an `onClick` prop.
//    - The trigger must accept a `ref` prop and assign it to it's root element.
// If wrap is false, Poppper Element:
//    - The popper element will receive a bunch of data attributes (starting with data-popper*) that must be spread on it's root element.
//    - The popper element must accept a `style` prop.
//    - The popper element must accept a `ref` prop and assign it to it's root element.
// This is done this way to avoid adding an additional root element around the popper element.

export const SHARED_POPPER_PROP_TYPES = {
    /**
     * Wether to show the popper element or not.
     */
    show: bool,
    /**
     * Position of the popper element.
     */
    position: oneOf(POSITIONS),
    /**
     * Disables automatic repositioning of the component, it will always be placed according to the position value.
     */
    pinned: bool,
    /**
     * Whether or not to render the popper element in an additional element that will handles [PopperJs](https://popper.js.org) references, attributes and styles.
     */
    noWrap: bool,
    /**
     * Allow to displace the popper element from its trigger element.
     * Ex: [10, -10]
     */
    offset: arrayOf(number),
    /**
     * A disabled popper only renders its trigger.
     */
    disabled: bool,
    /**
     * An array of modifiers passed directly to [PopperJs](https://popper.js.org) modifiers. For documentation, view [https://popper.js.org/docs/v2/modifiers](https://popper.js.org/docs/v2/modifiers).
     */
    popperModifiers: array,
    /**
     * A set of options passed directly to [PopperJs](https://popper.js.org). For documentation, view [https://popper.js.org/docs/v2/constructors/#options](https://popper.js.org/docs/v2/constructors/#options)
     */
    popperOptions: object,
    /**
     * A DOM element in which the popper element will appended via a React portal.
     */
    portalContainerElement: instanceOf(HTMLElement),
    /**
     * Disable the React portal behavior. The popper element will be rendered within it's parent DOM hierarchy.
     */
    disablePortal: bool,
    /**
     * Whether or not to animate the popper element when opening / closing.
     */
    animate: bool,
    /**
     * @ignore
     */
    className: string,
    /**
     * @ignore
     */
    style: object,
    /**
     * @ignore
     */
    children: node.isRequired,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

export const SHARED_POPPER_DEFAULT_PROPS = {
    position: "bottom",
    pinned: false,
    noWrap: false,
    disabled: false,
    disablePortal: false,
    animate: true
};

const propTypes = {
    /**
     * The popper trigger element.
     */
    triggerElement: instanceOf(HTMLElement).isRequired,
    ...SHARED_POPPER_PROP_TYPES
};

const defaultProps = {
    show: false,
    ...SHARED_POPPER_DEFAULT_PROPS
};

function disableModifier(name, modifiers) {
    const modifier = modifiers.find(x => x.name === name);

    if (!isNil(modifier)) {
        modifier.enabled = false;
    } else {
        modifiers.push({
            name: name,
            enabled: false
        });
    }
}

function setModifierOptions(name, options, modifiers) {
    const modifier = modifiers.find(x => x.name === name);

    if (!isNil(modifier)) {
        modifier.options = merge(modifier.options, options);
    } else {
        modifiers.push({
            name,
            options
        });
    }
}

// function usePopperModifiers(pinned, offset, popperModifiers) {
//     const mergedModifiers = popperModifiers || [];

//     if (pinned) {
//         disableModifier("preventOverflow", mergedModifiers);
//         disableModifier("flip", mergedModifiers);
//     }

//     if (!isNil(offset)) {
//         setModifierOptions("offset", { offset }, mergedModifiers);
//     }

//     return mergedModifiers;
// }

export function InnerPopper({
    show,
    position,
    triggerElement,
    pinned,
    noWrap,
    offset,
    disabled,
    popperModifiers,
    popperOptions,
    portalContainerElement: portalElement,
    disablePortal,
    animate,
    className,
    style,
    forwardedRef,
    children,
    ...rest
}) {
    const [popperElement, setPopperElement] = useState(null);

    const createModifiers = () => {
        const mergedModifiers = popperModifiers || [];

        if (pinned) {
            disableModifier("preventOverflow", mergedModifiers);
            disableModifier("flip", mergedModifiers);
        }

        if (!isNil(offset)) {
            setModifierOptions("offset", { offset }, mergedModifiers);
        }

        return mergedModifiers;
    };

    const { styles, attributes, update: updatePopper } = usePopper(triggerElement, popperElement, {
        placement: position,
        modifiers: createModifiers(),
        ...(popperOptions || {})
    });

    const handlePopperElementResize = useCallback(() => {
        updatePopper();
    }, [updatePopper]);

    useResizeObserver(popperElement, handlePopperElementResize);

    const setPopperRef = useCallback(element => {
        if (!isNil(element)) {
            setPopperElement(element);
        }

        assignRef(forwardedRef, element);
    }, [setPopperElement, forwardedRef]);

    const renderWrapper = popper => {
        const classes = mergeClasses(
            "outline-0",
            className
        );

        return (
            <div
                {...rest}
                className={classes}
                tabIndex="-1"
                data-testid="popper-wrapper"
            >
                {popper}
            </div>
        );
    };

    const renderPopper = () => {
        // This condition is a kind of a fix for "react-dates" calendar. If the calendar is rendered before being show, he will remain "hidden" event when
        // popper is shown.
        if (show) {
            const popper = Children.only(children);

            return cloneElement(!noWrap ? renderWrapper(popper) : popper, {
                style: {
                    ...style,
                    ...styles.popper,
                    display: show ? "block" : "none",
                    animation: animate ? "ou-popper-fade-in 0.3s" : undefined
                },
                ref: setPopperRef,
                ...attributes.popper
            });
        }
    };

    if (!disabled) {
        return (
            <Choose>
                <When condition={disablePortal}>
                    {renderPopper()}
                </When>
                <Otherwise>
                    {createPortal(renderPopper(), portalElement || window.document.body)}
                </Otherwise>
            </Choose>
        );
    }

    return null;
}

InnerPopper.propTypes = propTypes;
InnerPopper.defaultProps = defaultProps;

export const Popper = forwardRef((props, ref) => (
    <InnerPopper { ...props } forwardedRef={ref} />
));
