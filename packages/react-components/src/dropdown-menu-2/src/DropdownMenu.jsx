import { DropdownContext } from "./DropdownContext";
import { DropdownMenuContext } from "./DropdownMenuContext";
import { KEYS, SIZE, SemanticRef, createShorthandFactory, mergeClasses, useCombinedRefs, useDocumentListener, useEventCallback, useStaticCallback } from "../../shared";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { bool, func, object, string } from "prop-types";
import { forwardRef, useContext, useEffect, useMemo, useState } from "react";
import { isFunction, isNil } from "lodash";

const SIZE_CSS_CLASS = {
    [SIZE.small]: "small",
    [SIZE.large]: "large"
};

const propTypes = {
    scrolling: bool,
    onSelectItem: func,
    wrapperClassName: string,
    wrapperStyle: object
};

function useKeyboardNavigation(menuElement, isOpen, onSelectItem) {
    const [keyboardIndex, setKeyboardIndex] = useState(0);

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
    });

    useDocumentListener("keydown", handleDocumentKeyDown, isOpen);

    // Bypassing React with direct DOM manipulation to support custom sub components for items.
    useEffect(() => {
        itemElements.forEach((x, index) => {
            x.classList.toggle("selected", keyboardIndex === index);
        });
    }, [itemElements, keyboardIndex]);
}

export function InnerDropdownMenu({ scrolling, onSelectItem, wrapperClassName, wrapperStyle, children, forwardedRef, ...rest }) {
    const { isOpen, size } = useContext(DropdownContext);

    const [menuElement, setMenuElement] = useState();

    const menuRef = useCombinedRefs(setMenuElement, forwardedRef);

    useKeyboardNavigation(menuElement, isOpen, onSelectItem);

    const handleItemClick = useEventCallback(event => {
        if (!isNil(onSelectItem)) {
            onSelectItem(event);
        }
    });

    return (
        <DropdownMenuContext.Provider
            value={{
                onItemClick: handleItemClick
            }}
        >
            {/* This div element is rendered for compatibility with SUI theme.
                We should remove it once we don't depend on SUI. */}
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
        </DropdownMenuContext.Provider>
    );
}

InnerDropdownMenu.propTypes = propTypes;

export const DropdownMenu = forwardRef((props, ref) => (
    <InnerDropdownMenu {...props} forwardedRef={ref} />
));

export const createDropdownMenu = createShorthandFactory(DropdownMenu);
