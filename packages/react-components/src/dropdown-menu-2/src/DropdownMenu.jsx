import { Children, cloneElement, createRef, forwardRef, useCallback, useState } from "react";
import { DropdownItem } from "./DropdownItem";
import { KEYS, SemanticRef, createShorthand, mergeClasses, useDomEventListener } from "../../shared";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { bool, func } from "prop-types";
import { isNil } from "lodash";

const propTypes = {
    open: bool,
    onKeyDown: func,
    onSelectItem: func
};

function parseChildren(children) {
    const elements = [];
    const asArray = Children.toArray(children);

    let itemCount = 0;

    if (asArray.length > 0) {
        asArray.forEach(x => {
            const isItem = !isNil(x.type) && x.type.name === DropdownItem.name;

            elements.push({
                isItem,
                index: itemCount,
                element: x,
                ref: createRef()
            });

            if (isItem) {
                itemCount += 1;
            }
        });
    }

    return { itemCount, elements };
}

function useSetKeyboardItem({ elements }, setKeyboardIndex) {
    return useCallback(newIndex => {
        const selectedItem = elements.find(x => x.index === newIndex);

        if (isFunction(selectedItem.ref.current.focus)) {
            selectedItem.ref.current.focus();
        }

        setKeyboardIndex(newIndex);
    }, [elements, setKeyboardIndex]);
}

function useHandleItemClick({ onSelectItem }) {
    return useCallback(event => {
        if (!isNil(onSelectItem)) {
            onSelectItem(event);
        }
    }, [onSelectItem]);
}

function useHandleDocumentEnter({ onSelectItem }) {
    return useCallback(event => {
        if (!isNil(onSelectItem)) {
            onSelectItem(event);
        }
    }, [onSelectItem]);
}

function useHandleDocumentUpArrow({ itemCount }, keyboardIndex, setKeyboardItem) {
    return useCallback(() => {
        if (itemCount > 0) {
            if (keyboardIndex > 0) {
                setKeyboardItem(keyboardIndex - 1);
            } else {
                setKeyboardItem(itemCount - 1);
            }
        }
    }, [itemCount, keyboardIndex, setKeyboardItem]);
}

function useHandleDocumentDownArrow({ itemCount }, keyboardIndex, setKeyboardItem) {
    return useCallback(() => {
        if (itemCount > 0) {
            if (keyboardIndex < itemCount - 1) {
                setKeyboardItem(keyboardIndex + 1);
            } else {
                setKeyboardItem(0);
            }
        }
    }, [itemCount, keyboardIndex, setKeyboardItem]);
}

function useHandleDocumentKeyDown({ open, onKeyDown }, handleDocumentEnter, handleDocumentUp, handleDocumentDown) {
    const handler = useCallback(event => {
        switch (event.keyCode) {
            case KEYS.enter:
                handleDocumentEnter(event);
                break;
            case KEYS.up:
                handleDocumentUp(event);
                break;
            case KEYS.down:
                handleDocumentDown(event);
                break;
        }

        if (!isNil(onKeyDown)) {
            onKeyDown(event);
        }
    }, [onKeyDown, handleDocumentUp, handleDocumentDown, handleDocumentEnter]);

    useDomEventListener("keydown", handler, open);
}

function useItemsRenderer(parsedChildren, keyboardIndex, handleItemClick) {
    return () => {
        return parsedChildren.elements.map(x => {
            if (x.isItem) {
                return cloneElement(x.element, {
                    selected: x.index === keyboardIndex,
                    onClick: handleItemClick,
                    ref: x.ref
                });
            }

            return x.element;
        });
    };
}

function useRenderer({ className, forwardedRef, rest }, items) {
    return () => {
        const classes = mergeClasses(
            "ui dropdown dropdown-menu",
            className
        );

        return (
            <div
                {...rest}
                className={classes}
                tabIndex="-1"
            >
                <SemanticRef innerRef={forwardedRef}>
                    <SemanticDropdown.Menu
                        open
                        tabIndex="-1"
                    >
                        {items}
                    </SemanticDropdown.Menu>
                </SemanticRef>
            </div>
        );
    };
}

export function InnerDropdownMenu({ open, onKeyDown, onSelectItem, className, children, forwardedRef, ...rest }) {
    const [keyboardIndex, setKeyboardIndex] = useState(0);

    const parsedChildren = parseChildren(children);

    const setKeyboardItem = useSetKeyboardItem(parsedChildren, setKeyboardIndex);

    const handleItemClick = useHandleItemClick({ onSelectItem });
    const handleDocumentEnter = useHandleDocumentEnter({ onSelectItem });
    const handleDocumentUpArrow = useHandleDocumentUpArrow(parsedChildren, keyboardIndex, setKeyboardItem);
    const handleDocumentDownArrow = useHandleDocumentDownArrow(parsedChildren, keyboardIndex, setKeyboardItem);

    useHandleDocumentKeyDown({ open, onKeyDown }, handleDocumentEnter, handleDocumentUpArrow, handleDocumentDownArrow);

    const renderItems = useItemsRenderer(parsedChildren, keyboardIndex, handleItemClick);
    const render = useRenderer({ className, forwardedRef, rest }, renderItems());

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

InnerDropdownMenu.propTypes = propTypes;

export const DropdownMenu = forwardRef((props, ref) => (
    <InnerDropdownMenu {...props} forwardedRef={ref} />
));

export const createDropdownMenu = createShorthand(DropdownMenu);
