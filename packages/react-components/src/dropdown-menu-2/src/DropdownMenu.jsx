import { KEYS, SIZE, SemanticRef, classes, createShorthandFactory, useCombinedRefs, useDocumentListener, useEventCallback, useStaticCallback } from "../../shared";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { bool, func, object, oneOf, string } from "prop-types";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { isFunction, isNil } from "lodash";

const SIZE_CSS_CLASS = {
    [SIZE.small]: "small",
    [SIZE.large]: "large"
};

const propTypes = {
    open: bool,
    onKeyDown: func,
    onItemClick: func,
    size: oneOf(["small", "large"]),
    wrapperClassName: string,
    wrapperStyle: object
};

export function InnerDropdownMenu({ open, onKeyDown, onItemClick, size, scrolling, wrapperClassName, wrapperStyle, children, forwardedRef, ...rest }) {
    const [keyboardIndex, setKeyboardIndex] = useState(0);
    const [menuElement, setMenuElement] = useState();

    const menuRef = useCombinedRefs(setMenuElement, forwardedRef);

    const itemsElements = useMemo(() => {
        return !isNil(menuElement) ? menuElement.querySelectorAll(".item") : [];
    }, [menuElement]);

    const setKeyboardItem = useStaticCallback(newIndex => {
        const selectedItem = itemsElements[newIndex];

        if (isFunction(selectedItem.focus)) {
            selectedItem.focus();
        }

        setKeyboardIndex(newIndex);
    });

    const handleDocumentEnter = useEventCallback(event => {
        if (!isNil(onItemClick)) {
            onItemClick(event);
        }
    });

    const handleDocumentUpArrow = useEventCallback(() => {
        if (itemsElements.length > 0) {
            if (keyboardIndex > 0) {
                setKeyboardItem(keyboardIndex - 1);
            } else {
                setKeyboardItem(itemsElements.length - 1);
            }
        }
    });

    const handleDocumentDownArrow = useEventCallback(() => {
        if (itemsElements.length > 0) {
            if (keyboardIndex < itemsElements.length - 1) {
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

        if (!isNil(onKeyDown)) {
            onKeyDown(event);
        }
    });

    useDocumentListener("keydown", handleDocumentKeyDown, open);

    const handleItemClick = useEventCallback(event => {
        if (!isNil(onItemClick)) {
            onItemClick(event);
        }
    });

    // Manipulating items with DOM to support custom sub components for items.
    useEffect(() => {
        itemsElements.forEach((x, index) => {
            x.classList.toggle("selected", keyboardIndex === index);
            x.addEventListener("click", handleItemClick);
        });

        return () => {
            itemsElements.forEach(x => {
                x.removeEventListener("click", handleItemClick);
            });
        };
    }, [itemsElements, keyboardIndex, handleItemClick]);

    return (
        // This div element is rendered for compatibility with SUI theme.
        // We should remove it once we don't depend on SUI.
        <div
            className={classes(
                "ui dropdown dropdown-menu",
                size && SIZE_CSS_CLASS[size],
                scrolling && "scrolling",
                wrapperClassName
            )}
            style={wrapperStyle}
            tabIndex="-1"
        >
            <SemanticRef innerRef={menuRef}>
                <SemanticDropdown.Menu
                    {...rest}
                    open
                    tabIndex="-1"
                >
                    {children}
                </SemanticDropdown.Menu>
            </SemanticRef>
        </div>
    );
}

InnerDropdownMenu.propTypes = propTypes;

export const DropdownMenu = forwardRef((props, ref) => (
    <InnerDropdownMenu {...props} forwardedRef={ref} />
));

export const createDropdownMenu = createShorthandFactory(DropdownMenu);
