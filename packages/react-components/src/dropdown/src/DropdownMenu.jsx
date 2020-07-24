import { DropdownContext } from "./DropdownContext";
import { KEYS, getSizeClass, mergeClasses, resolvePopperPosition, useDocumentListener, useEventCallback, useMergedRefs } from "../../shared";
import { Popper } from "../../popper";
import { any, bool, elementType, number, oneOfType, string } from "prop-types";
import { forwardRef, useContext, useEffect, useMemo, useState } from "react";
import { isFunction, isNil } from "lodash";

const propTypes = {
    /**
     * When true, disables automatic repositioning of the dropdown menu, it will always be placed according to the position value.
     */
    pinned: bool,
    /**
     * z-index of the dropdown menu.
     */
    zIndex: number,
    /**
     * Whether or not to render the dropdown menu element with React portal. The dropdown menu element will be rendered within it's parent DOM hierarchy.
     */
    noPortal: bool,
    /**
     * Whether or not the menu can scroll.
     */
    scrolling: bool,
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
    as: "div"
};

function useKeyboardNavigation(menuElement, isOpen, onSelectItem) {
    const [keyboardIndex, setKeyboardIndex] = useState(0);

    const itemElements = useMemo(
        () => !isNil(menuElement) ? menuElement.querySelectorAll(".item") : [],
        [menuElement]
    );

    const setKeyboardItem = newIndex => {
        const selectedItem = itemElements[newIndex];

        if (isFunction(selectedItem.focus)) {
            selectedItem.focus();
        }

        setKeyboardIndex(newIndex);
    };

    const handleDocumentEnter = useEventCallback(event => {
        if (!isNil(onSelectItem)) {
            onSelectItem(event);
        }
    });

    const handleDocumentUpArrow = useEventCallback(() => {
        if (itemElements.length > 0) {
            if (keyboardIndex > 0) {
                setKeyboardItem(keyboardIndex - 1);
            } else {
                setKeyboardItem(itemElements.length - 1);
            }
        }
    });

    const handleDocumentDownArrow = useEventCallback(() => {
        if (itemElements.length > 0) {
            if (keyboardIndex < itemElements.length - 1) {
                setKeyboardItem(keyboardIndex + 1);
            } else {
                setKeyboardItem(0);
            }
        }
    });

    const handleDocumentKeyDown = useEventCallback(event => {
        switch (event.keyCode) {
            case KEYS.enter:
                handleDocumentEnter(event);
                break;
            case KEYS.up:
                handleDocumentUpArrow(event);
                break;
            case KEYS.down:
                handleDocumentDownArrow(event);
                break;
        }
    });

    useDocumentListener("keydown", handleDocumentKeyDown, isOpen);

    // Bypassing React with direct DOM manipulation to support custom sub components for items.
    useEffect(() => {
        itemElements.forEach((x, index) => {
            x.classList.toggle("selected", keyboardIndex === index);
        });
    }, [itemElements, keyboardIndex]);
}

export function InnerDropdownMenu({ pinned, zIndex, noPortal, scrolling, onSelectItem, as: ElementType, className, children, forwardedRef, ...rest }) {
    const { isOpen, fluid, size, upward, direction, triggerRef, menuRef } = useContext(DropdownContext);

    // Since the keyboard navigation code is doing direct DOM manipulation the menu must be re-rendered everytime the menu ref change.
    const [menuElement, setMenuElement] = useState();

    const ref = useMergedRefs(setMenuElement, menuRef, forwardedRef);

    useKeyboardNavigation(menuElement, isOpen, onSelectItem);

    return (
        <Popper
            show={isOpen}
            triggerElement={triggerRef.current}
            position={resolvePopperPosition(upward, direction)}
            pinned={pinned}
            offset={[0, 10]}
            zIndex={zIndex}
            fluid={fluid}
            noPortal={noPortal}
            ref={ref}
        >
            <ElementType
                {...rest}
                className={mergeClasses(
                    "o-ui dropdown-menu",
                    scrolling && "scrolling",
                    fluid && "fluid",
                    getSizeClass(size),
                    className
                )}
                tabIndex="-1"
            >
                {children}
            </ElementType>
        </Popper>
    );
}

InnerDropdownMenu.propTypes = propTypes;
InnerDropdownMenu.defaultProps = defaultProps;

export const DropdownMenu = forwardRef((props, ref) => (
    <InnerDropdownMenu {...props} forwardedRef={ref} />
));
