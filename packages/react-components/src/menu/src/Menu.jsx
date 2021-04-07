import "./Menu.css";

import { Box } from "../../box";
import {
    Keys,
    appendEventKey,
    cssModule,
    mergeProps,
    useAutoFocusChild,
    useControllableState,
    useDisposables,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useId,
    useMergedRefs,
    useRefState,
    useRovingFocus
} from "../../shared";
import { MenuContext } from "./MenuContext";
import { MenuItem } from "./MenuItem";
import { MenuSection } from "./MenuSection";
import { NodeType, useCollection } from "../../collection";
import { SelectionMode } from "./selectionMode";
import { any, arrayOf, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil, isNumber } from "lodash";

export const ItemKeyProp = "data-o-ui-key";

const propTypes = {
    /**
     * A controlled set of the selected item keys.
     */
    selectedKeys: arrayOf(string),
    /**
     * The initial value of `selectedKeys` when uncontrolled.
     */
    defaultSelectedKeys: arrayOf(string),
    /**
     * Called when the selected keys change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {String[]} keys - The keys of the selected items..
     * @returns {void}
     */
    onSelectionChange: func,
    /**
     * The type of selection that is allowed.
     */
    selectionMode: oneOf(["none", "single", "multiple"]),
    /**
     * Whether or not the menu should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Default focus target when enabling autofocus.
     */
    defaultFocusTarget: string,
    /**
     * Whether or not the listbox take up the width of its container.
     */
    fluid: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func])
};

export function InnerMenu({
    id,
    selectedKeys: selectedKeysProp,
    defaultSelectedKeys,
    onSelectionChange,
    selectionMode = "none",
    autoFocus,
    defaultFocusTarget,
    fluid,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    as = "ul",
    children,
    forwardedRef,
    ...rest
}) {
    const [selectedKeys, setSelectedKeys] = useControllableState(selectedKeysProp, defaultSelectedKeys, []);
    const [searchQueryRef, setSearchQuery] = useRefState("");

    const [focusScope, setFocusRef] = useFocusScope();

    const containerRef = useMergedRefs(setFocusRef, forwardedRef);

    const focusManager = useFocusManager(focusScope, { keyProp: ItemKeyProp });

    const handleSelectItem = useEventCallback((event, key) => {
        let newKeys;

        if (selectionMode === SelectionMode.multiple) {
            newKeys = selectedKeys.includes(key) ? selectedKeys.filter(x => x !== key) : [...selectedKeys, key];
        } else {
            newKeys = selectedKeys.includes(key) ? [] : [key];
        }

        if (!isNil(onSelectionChange)) {
            onSelectionChange(event, newKeys);
        }

        if (selectionMode !== SelectionMode.none) {
            setSelectedKeys(newKeys);
        }
    });

    const searchDisposables = useDisposables();

    const handleKeyDown = useEventCallback(event => {
        searchDisposables.dispose();

        switch (event.key) {
            case Keys.arrowDown: {
                event.preventDefault();
                focusManager.focusNext();
                break;
            }
            case Keys.arrowUp: {
                event.preventDefault();
                focusManager.focusPrevious();
                break;
            }
            case Keys.home:
                event.preventDefault();
                focusManager.focusFirst();
                break;
            case Keys.end:
                event.preventDefault();
                focusManager.focusLast();
                break;
            // eslint-disable-next-line no-fallthrough
            default:
                if (event.key.length === 1) {
                    event.preventDefault();

                    const query = appendEventKey(searchQueryRef.current, event.key);

                    setSearchQuery(query);
                    focusManager.search(query);

                    // Clear search query.
                    searchDisposables.setTimeout(() => {
                        setSearchQuery("");
                    }, 350);
                }
        }
    });

    useRovingFocus(focusScope);

    useAutoFocusChild(focusManager, {
        target: (selectionMode !== SelectionMode.none ? selectedKeys[0] : undefined) ?? defaultFocusTarget,
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        onNotFound: useEventCallback(() => {
            // Ensure keyboard navigation is available.
            containerRef.current?.focus();
        })
    });

    const nodes = useCollection(children);

    const rootId = useId(id, id ? null : "o-ui-menu");

    const renderOption = ({
        key,
        index,
        elementType: ElementType = MenuItem,
        ref,
        content,
        props,
        tooltip
    }) => (
        <ElementType
            {...props}
            id={`${rootId}-item-${index}`}
            key={key}
            ref={ref}
            item={{ key, tooltip }}
        >
            {content}
        </ElementType>
    );

    const renderSection = ({
        key,
        index,
        elementType: ElementType = MenuSection,
        ref,
        props,
        items: sectionItems
    }) => {
        if (sectionItems.length === 0) {
            return null;
        }

        return (
            <ElementType
                {...props}
                id={`${rootId}-section-${index}`}
                key={key}
                ref={ref}
            >
                {sectionItems.map(x => renderOption(x))}
            </ElementType>
        );
    };

    const renderDivider = ({
        key,
        elementType: ElementType,
        ref,
        content,
        props
    }) => (
        <ElementType
            {...mergeProps(
                props,
                {
                    className: "o-ui-menu-divider",
                    as: "li"
                }
            )}
            key={key}
            ref={ref}
        >
            {content}
        </ElementType>
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    id: rootId,
                    className: cssModule(
                        "o-ui-menu",
                        fluid && "fluid"
                    ),
                    onKeyDown: handleKeyDown,
                    role: "menu",
                    "aria-orientation": "vertical",
                    "aria-label": ariaLabel,
                    "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy : undefined,
                    as,
                    ref: containerRef
                }
            )}
        >
            <MenuContext.Provider
                value={{
                    selectedKeys,
                    selectionMode,
                    onSelect: handleSelectItem
                }}
            >
                {nodes.map(({ type, ...nodeProps }) => {
                    switch (type) {
                        case NodeType.item:
                            return renderOption(nodeProps);
                        case NodeType.section:
                            return renderSection(nodeProps);
                        case NodeType.divider:
                            return renderDivider(nodeProps);
                        default:
                            return null;
                    }
                })}
            </MenuContext.Provider>
        </Box>
    );
}

InnerMenu.propTypes = propTypes;

export const Menu = forwardRef((props, ref) => (
    <InnerMenu {...props} forwardedRef={ref} />
));

Menu.displayName = "Menu";
