import "./popper.css";

import { Children, cloneElement, forwardRef, useCallback, useState } from "react";
import { array, arrayOf, bool, func, instanceOf, node, number, object, oneOf, oneOfType, string } from "prop-types";
import { createPortal } from "react-dom";
import { isNil, merge } from "lodash";
import { usePopper } from "react-popper";
import { useResizeObserver } from "../../shared";

// USAGE:
// Trigger:
//    - The trigger must accept an `onClick` prop.
//    - The trigger must accept a `ref` prop and assign it to it's root element.
// If wrap is false, Poppper Element:
//    - The popper element will receive a bunch of data attributes (starting with data-popper*) that must be spread on it's root element.
//    - The popper element must accept a `style` prop.
//    - The popper element must accept a `ref` prop and assign it to it's root element.
// This is done this way to avoid adding an additional root element around the popper element.

// STORIES:
// Flip:
//    - With a custom boundary when in a container that is not the document or the viewport OR disablePortal
// Prevent Overflow:
//    - With a custom boundary when in a container that is not the document or the viewport OR disablePortal


const propTypes = {
    defaultOpen: bool,
    trigger: node.isRequired,
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
     * Disables automatic repositioning of the component, it will always be placed according to the position value.
     */
    pinned: bool,
    /**
     * Whether or not to render the popper element in an additional element that will handles [PopperJs](https://popper.js.org) references, attributes and styles.
     */
    wrap: bool,
    /**
     * Allow to displace the popper element from its trigger element.
     *
     * Ex: ["10px", "-10px"]
     */
    offset: arrayOf(number),
    /**
     * A disabled popper only renders its trigger.
     */
    disabled: bool,
    /**
     * An array of modifiers passed directly to [PopperJs](https://popper.js.org) modifiers. For documentation, view [https://popper.js.org/docs/v2/modifiers](https://popper.js.org/docs/v2/modifiers).
     */
    modifiers: array,
    /**
     * A set of options passed directly to [PopperJs](https://popper.js.org). For documentation, view [https://popper.js.org/docs/v2/constructors/#options](https://popper.js.org/docs/v2/constructors/#options)
     */
    popperOptions: object,
    /**
     * A DOM element in which the popper element will appended via a React portal.
     */
    containerElement: instanceOf(HTMLElement),
    /**
     * Disable the React portal behavior. The popper element will be rendered within it's parent DOM hierarchy.
     */
    disablePortal: bool,
    /**
     * Whether or not to animate the popper element when opening / closing.
     */
    animate: bool,
    /**
     * Additional classes.
     */
    className: string,
    /**
     * Additional inline styles.
     */
    style: object,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    position: "bottom",
    pinned: false,
    wrap: true,
    disabled: false,
    disablePortal: false,
    animate: true
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

export function PurePopper({ defaultOpen, trigger, position, pinned, wrap, offset, disabled, modifiers, popperOptions, containerElement, disablePortal, animate, style, forwardedRef, children, ...rest }) {
    const [triggerElement, setTriggerElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const createModifiers = () => {
        const mergedModifiers = modifiers || [];

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

    const renderTrigger = () => {
        if (!disabled) {
            return cloneElement(trigger, {
                onClick: () => { setIsOpen(!isOpen); },
                ref: setTriggerElement
            });
        }

        return trigger;
    };

    const renderPopper = () => {
        const popper = Children.only(children);

        return cloneElement(wrap ? <div ref={forwardedRef} {...rest}>{popper}</div> : popper, {
            style: {
                ...style,
                ...styles.popper,
                display: isOpen ? "block" : "none",
                animation: animate ? "ou-popper-fade-in 0.3s" : undefined
            },
            ref: setPopperElement,
            ...attributes.popper
        });
    };

    return (
        <>
            {renderTrigger()}
            <If condition={!disabled}>
                <Choose>
                    <When condition={disablePortal}>
                        {renderPopper()}
                    </When>
                    <Otherwise>
                        {createPortal(renderPopper(), containerElement || window.document.body)}
                    </Otherwise>
                </Choose>
            </If>
        </>
    );
}

PurePopper.propTypes = propTypes;
PurePopper.defaultProps = defaultProps;

export const Popper = forwardRef((props, ref) => (
    <PurePopper { ...props } forwardedRef={ref} />
));
