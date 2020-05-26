import { Children, cloneElement, forwardRef, useCallback, useState } from "react";
import { DropdownItem } from "./DropdownItem";
import { KEYS, SemanticRef, mergeClasses } from "../../shared";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { func } from "prop-types";
import { isNil } from "lodash";

// TODO: What is open with click and then using arrows? I think the the popper might need "showKeyCodes" and "hideKeyCodes".
// Then this component could listen to document instead for key up & down and only react if is visible.

const propTypes = {
    onKeyDown: func
};

function useHandleUpArrow({ itemCount }, keyboardIndex, setKeyboardIndex) {
    return useCallback(() => {
        if (itemCount > 0) {
            if (keyboardIndex > 0) {
                setKeyboardIndex(x => x - 1);
            } else {
                setKeyboardIndex(itemCount - 1);
            }
        }
    }, [itemCount, keyboardIndex, setKeyboardIndex]);
}

function useHandleDownArrow({ itemCount }, keyboardIndex, setKeyboardIndex) {
    return useCallback(() => {
        if (itemCount > 0) {
            if (keyboardIndex < itemCount - 1) {
                setKeyboardIndex(x => x + 1);
            } else {
                setKeyboardIndex(0);
            }
        }
    }, [itemCount, keyboardIndex, setKeyboardIndex]);
}

// TODO: Liste to document keydown
function useHandleKeyDown({ onKeyDown }, handleDocumentUp, handleDocumentDown) {
    return useCallback(event => {
        switch (event.keyCode) {
            // case KEYS.esc:
            //     this.handleDocumentEscape(event);
            //     break;
            // case KEYS.enter:
            //     this.handleDocumentEnter(event);
            //     break;
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
    }, [onKeyDown, handleDocumentUp, handleDocumentDown]);
}

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
                element: x
            });

            if (isItem) {
                itemCount += 1;
            }
        });
    }

    return { itemCount, elements };
}

function useItemsRenderer(parsedChildren, keyboardIndex) {
    return () => {
        return parsedChildren.elements.map(x => {
            if (x.isItem) {
                return cloneElement(x.element, {
                    selected: x.index === keyboardIndex
                });
            }

            return x.element;
        });
    };
}

function useRenderer({ className, forwardedRef, rest }, handleKeyDown, items) {
    return () => {
        const classes = mergeClasses(
            "ui dropdown dropdown-menu",
            className
        );

        return (
            <div
                {...rest}
                className={classes}
            >
                <SemanticRef innerRef={forwardedRef}>
                    <SemanticDropdown.Menu
                        onKeyDown={handleKeyDown}
                        open
                    >
                        {items}
                    </SemanticDropdown.Menu>
                </SemanticRef>
            </div>
        );
    };
}

export function InnerDropdownMenu({ onKeyDown, className, children, forwardedRef, ...rest }) {
    const [keyboardIndex, setKeyboardIndex] = useState(0);

    const parsedChildren = parseChildren(children);

    const handleUpArrow = useHandleUpArrow(parsedChildren, keyboardIndex, setKeyboardIndex);
    const handleDownArrow = useHandleDownArrow(parsedChildren, keyboardIndex, setKeyboardIndex);
    const handleKeyDown = useHandleKeyDown({ onKeyDown }, handleUpArrow, handleDownArrow);

    const renderItems = useItemsRenderer(parsedChildren, keyboardIndex);
    const render = useRenderer({ className, forwardedRef, rest }, handleKeyDown, renderItems());

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

InnerDropdownMenu.propTypes = propTypes;

export const DropdownMenu = forwardRef((props, ref) => (
    <InnerDropdownMenu {...props} forwardedRef={ref} />
));
