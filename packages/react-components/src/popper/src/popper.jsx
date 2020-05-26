import "./popper.css";

import { Children, cloneElement, forwardRef, useCallback, useState } from "react";
import { POSITIONS } from "./positions";
import { array, arrayOf, bool, instanceOf, number, object, oneOf } from "prop-types";
import { createPortal } from "react-dom";
import { isFunction, isNil, merge } from "lodash";
import { mergeClasses, useCombinedRefs, useResizeObserver } from "../../shared";
import { usePopper } from "react-popper";

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
     * Whether or not to render the popper element in an additional element that will handles [Popper.js](https://popper.js.org) references, attributes and styles.
     */
    noWrap: bool,
    /**
     * Allow to displace the popper element from its trigger element.
     * Ex: [10, -10]
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
     * Whether or not to render the popper element with React portal. The popper element will be rendered within it's parent DOM hierarchy.
     */
    noPortal: bool,
    /**
     * Whether or not to animate the popper element when opening / closing.
     */
    animate: bool
};

export const SHARED_POPPER_DEFAULT_PROPS = {
    position: "bottom",
    pinned: false,
    noWrap: false,
    noPortal: false,
    animate: true
};

const propTypes = {
    /**
     * The popper trigger element.
     */
    triggerElement: instanceOf(HTMLElement),
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

function createPopperModifiers(pinned, offset, popperModifiers) {
    const mergedModifiers = popperModifiers || [];

    if (pinned) {
        disableModifier("preventOverflow", mergedModifiers);
        disableModifier("flip", mergedModifiers);
    }

    if (!isNil(offset)) {
        setModifierOptions("offset", { offset }, mergedModifiers);
    }

    return mergedModifiers;
}

function useHandlePopperElementResize(updatePopper, popperElement) {
    const handlePopperElementResize = useCallback(() => {
        if (isFunction(updatePopper)) {
            updatePopper();
        }
    }, [updatePopper]);

    useResizeObserver(popperElement, handlePopperElementResize);
}

function usePopperInstance(position, triggerElement, pinned, offset, popperModifiers, popperOptions, popperElement) {
    const modifiers = createPopperModifiers(pinned, offset, popperModifiers);

    const { styles, attributes, update: updatePopper } = usePopper(triggerElement, popperElement, {
        placement: position,
        modifiers,
        ...(popperOptions || {})
    });

    useHandlePopperElementResize(updatePopper, popperElement);

    return [styles.popper, attributes.popper];
}

function useWrapperRenderer({ className, rest }) {
    return popper => {
        const classes = mergeClasses(
            "outline-0",
            className
        );

        return (
            <div
                data-testid="popper-wrapper"
                tabIndex="-1"
                {...rest}
                className={classes}
            >
                {popper}
            </div>
        );
    };
}

function usePopperRenderer({ show, noWrap, animate, style, children }, popperStyles, popperAttributes, popperRef, renderWrapper) {
    return () => {
        // This condition is a fix for "react-dates" calendar. If the calendar is rendered before being show, he will remain "hidden" event when
        // popper is shown.
        if (show) {
            const popper = Children.only(children);

            return cloneElement(!noWrap ? renderWrapper(popper) : popper, {
                style: {
                    ...style,
                    ...popperStyles,
                    display: show ? "block" : "none",
                    animation: animate ? "ou-popper-fade-in 0.3s" : undefined
                },
                ...popperAttributes,
                ref: popperRef
            });
        }

        return null;
    };
}

function useRenderer({ disabled, noPortal, portalElement }, popper) {
    return () => {
        if (!disabled) {
            return (
                <Choose>
                    <When condition={noPortal}>
                        {popper}
                    </When>
                    <Otherwise>
                        {createPortal(popper, portalElement || window.document.body)}
                    </Otherwise>
                </Choose>
            );
        }

        return null;
    };
}

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
    noPortal,
    animate,
    className,
    style,
    forwardedRef,
    children,
    ...rest
}) {
    const [popperElement, setPopperElement] = useState();

    const popperRef = useCombinedRefs(forwardedRef, setPopperElement);

    const [popperStyles, popperAttributes] = usePopperInstance(position, triggerElement, pinned, offset, popperModifiers, popperOptions, popperElement);

    const renderWrapper = useWrapperRenderer({ className, rest });
    const renderPopper = usePopperRenderer({ show, noWrap, animate, style, children }, popperStyles, popperAttributes, popperRef, renderWrapper);
    const render = useRenderer({ disabled, noPortal, portalElement }, renderPopper());

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

InnerPopper.propTypes = propTypes;
InnerPopper.defaultProps = defaultProps;

export const Popper = forwardRef((props, ref) => (
    <InnerPopper { ...props } forwardedRef={ref} />
));
