import { DropdownContext } from "./DropdownContext";
import { DropdownMenuContext } from "./DropdownMenuContext";
import { KEYS, SIZE, SemanticRef, createShorthandFactory, mergeClasses, useCombinedRefs, useDocumentListener, useEventCallback, useStaticCallback } from "../../shared";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { forwardRef, useContext, useEffect, useMemo, useState } from "react";
import { func, object, string } from "prop-types";
import { isFunction, isNil } from "lodash";

const SIZE_CSS_CLASS = {
    [SIZE.small]: "small",
    [SIZE.large]: "large"
};

const propTypes = {
    onKeyDown: func,
    onSelectItem: func,
    wrapperClassName: string,
    wrapperStyle: object
};

export function InnerDropdownMenu({ onKeyDown, onSelectItem, wrapperClassName, wrapperStyle, children, forwardedRef, ...rest }) {
    const { isOpen, size, scrolling } = useContext(DropdownContext);

    const [keyboardIndex, setKeyboardIndex] = useState(0);
    const [menuElement, setMenuElement] = useState();

    const menuRef = useCombinedRefs(setMenuElement, forwardedRef);

    const itemElements = useMemo(() => !isNil(menuElement) ? menuElement.querySelectorAll(".item") : [], [menuElement]);

    const setKeyboardItem = useStaticCallback(newIndex => {
        const selectedItem = itemElements[newIndex];

        if (isFunction(selectedItem.focus)) {
            selectedItem.focus();
        }

        setKeyboardIndex(newIndex);
    });

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

        if (!isNil(onKeyDown)) {
            onKeyDown(event);
        }
    });

    useDocumentListener("keydown", handleDocumentKeyDown, isOpen);

    const handleItemClick = useEventCallback(event => {
        if (!isNil(onSelectItem)) {
            onSelectItem(event);
        }
    });

    // Manipulating items with DOM to support custom sub components for items.
    useEffect(() => {
        itemElements.forEach((x, index) => {
            x.classList.toggle("selected", keyboardIndex === index);
        });
    }, [itemElements, keyboardIndex]);

    return (
        // This div element is rendered for compatibility with SUI theme.
        // We should remove it once we don't depend on SUI.
        <div
            className={mergeClasses(
                "ui dropdown dropdown-menu",
                size && SIZE_CSS_CLASS[size],
                scrolling && "scrolling",
                wrapperClassName
            )}
            style={wrapperStyle}
            tabIndex="-1"
        >
            <DropdownMenuContext.Provider value={{
                onItemClick: handleItemClick
            }}
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
            </DropdownMenuContext.Provider>
        </div>
    );
}

InnerDropdownMenu.propTypes = propTypes;

export const DropdownMenu = forwardRef((props, ref) => (
    <InnerDropdownMenu {...props} forwardedRef={ref} />
));

export const createDropdownMenu = createShorthandFactory(DropdownMenu);
