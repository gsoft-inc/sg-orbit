import { CollectionDivider, CollectionItem, CollectionNode, CollectionSection, NodeType, useCollection, useScrollableCollection } from "../../collection";
import { ComponentProps, KeyboardEvent, ReactNode, SyntheticEvent, forwardRef } from "react";
import {
    InternalProps,
    Keys,
    OmitInternalProps,
    StyledComponentProps,
    appendEventKey,
    cssModule,
    isEmptyArray,
    isNil,
    isNumber,
    mergeProps,
    useAutoFocusChild,
    useControllableState,
    useDisposables,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useId,
    useKeyedRovingFocus,
    useMergedRefs,
    useRefState
} from "../../shared";
import { ResponsiveProp, useResponsiveValue } from "../../styling";

import { Box } from "../../box";
import { MenuContext } from "./MenuContext";
import { MenuItem } from "./MenuItem";
import { MenuSection } from "./MenuSection";
import { ValidationState } from "../../input";

export type SelectionMode = "none" | "single" | "multiple";

export const ItemKeyProp = "data-o-ui-key";

const DefaultElement = "ul";

export interface InnerMenuProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * Whether or not the menu should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Default focus target when enabling autofocus.
     */
    autoFocusTarget?: string;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The initial value of `selectedKeys` when uncontrolled.
     */
    defaultSelectedKeys?: string[];
    /**
     * Whether or not the menu items are disabled.
     */
    disabled?: boolean;
    /**
     * Whether or not the listbox take up the width of its container.
     */
    fluid?: ResponsiveProp<boolean>;
    /**
     * A collection of nodes to render instead of children. It should only be used if you embed a Menu inside another component.
     */
    nodes?: CollectionNode[];
    /**
     * Called when the selected keys change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {String[]} keys - The keys of the selected items..
     * @returns {void}
     */
    onSelectionChange?: (event: SyntheticEvent, keys: string[]) => void;
    /**
     * A controlled set of the selected item keys.
     */
    selectedKeys?: string[] | null;
    /**
     * The type of selection that is allowed.
     */
    selectionMode?: SelectionMode;
    /**
     * Whether or not the menu should display as "valid" or "invalid".
     */
    validationState?: ValidationState;
}

const MenuItemHeight = 32;

const MenuBorderSize = 1;

function useCollectionNodes(children: ReactNode, nodes: CollectionNode[]) {
    const collectionNodes = useCollection(children);

    return nodes ?? collectionNodes;
}

export function InnerMenu({
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    as = DefaultElement,
    autoFocus,
    children,
    autoFocusTarget,
    defaultSelectedKeys,
    fluid,
    forwardedRef,
    id,
    nodes: nodesProp,
    onSelectionChange,
    selectedKeys: selectedKeysProp,
    selectionMode = "none",
    validationState,
    ...rest
}: InnerMenuProps) {
    const fluidValue = useResponsiveValue(fluid);

    const [selectedKeys, setSelectedKeys] = useControllableState(selectedKeysProp, defaultSelectedKeys, []);
    const [typeaheadQueryRef, setTypeaheadQuery] = useRefState("");

    const [focusScope, setFocusRef] = useFocusScope();

    const containerRef = useMergedRefs(setFocusRef, forwardedRef);

    const focusManager = useFocusManager(focusScope, { keyProp: ItemKeyProp });

    const handleSelectItem = useEventCallback((event: SyntheticEvent, key: string) => {
        let newKeys;

        if (selectionMode === "multiple") {
            newKeys = selectedKeys.includes(key) ? selectedKeys.filter(x => x !== key) : [...selectedKeys, key];
        } else {
            newKeys = selectedKeys.includes(key) ? [] : [key];
        }

        if (selectionMode !== "none") {
            setSelectedKeys(newKeys);
        }

        if (!isNil(onSelectionChange)) {
            onSelectionChange(event, newKeys);
        }
    });

    const typeaheadDisposables = useDisposables();

    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
        typeaheadDisposables.dispose();

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
            case Keys.enter:
            case Keys.space:
                event.preventDefault();

                handleSelectItem(event, document.activeElement.getAttribute(ItemKeyProp));

                break;
            // eslint-disable-next-line no-fallthrough
            default:
                if (event.key.length === 1) {
                    event.preventDefault();

                    const query = appendEventKey(typeaheadQueryRef.current, event.key);

                    setTypeaheadQuery(query);
                    focusManager.focusFirstQueryMatch(query);

                    // Clear search query.
                    typeaheadDisposables.setTimeout(() => {
                        setTypeaheadQuery("");
                    }, 350);
                }
        }
    });

    useKeyedRovingFocus(focusScope, selectedKeys[0], {
        keyProp: ItemKeyProp
    });

    useAutoFocusChild(focusManager, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus,
        target: selectedKeys[0] ?? autoFocusTarget
    });

    const nodes = useCollectionNodes(children, nodesProp);

    const scrollableProps = useScrollableCollection(containerRef, nodes, {
        disabled: selectionMode === "none",
        dividerSelector: ".o-ui-menu-divider",
        itemSelector: ".o-ui-menu-item",
        maxHeight: 12 * MenuItemHeight,
        paddingHeight: 2 * MenuBorderSize,
        sectionSelector: ".o-ui-menu-section-title"
    });

    const rootId = useId(id, "o-ui-menu");

    const renderItem = ({
        content,
        elementType: As = MenuItem,
        index,
        key,
        props,
        ref,
        tooltip
    }: CollectionItem) => (
        <As
            {...mergeProps(
                props,
                {
                    id: `${rootId}-item-${index + 1}`,
                    item: { key, tooltip },
                    key,
                    ref
                }
            )}
        >
            {content}
        </As>
    );

    const renderSection = ({
        key,
        index,
        elementType: As = MenuSection,
        ref,
        props,
        items: sectionItems
    }: CollectionSection) => {
        if (isEmptyArray(sectionItems)) {
            return null;
        }

        return (
            <As
                {...mergeProps(
                    props,
                    {
                        id: `${rootId}-section-${index + 1}`,
                        key,
                        ref
                    }
                )}
            >
                {sectionItems.map(x => renderItem(x))}
            </As>
        );
    };

    const renderDivider = ({
        content,
        elementType: As,
        key,
        props,
        ref
    }: CollectionDivider) => (
        <As
            {...mergeProps(
                props,
                {
                    as: "li",
                    className: "o-ui-menu-divider",
                    key,
                    ref
                }
            )}
        >
            {content}
        </As>
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    "aria-invalid": validationState === "invalid" ? true : undefined,
                    "aria-label": ariaLabel,
                    "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy : undefined,
                    "aria-orientation": "vertical",
                    as,
                    className: cssModule(
                        "o-ui-menu",
                        fluidValue && "fluid",
                        selectionMode !== "none" && "with-selection",
                        validationState
                    ),
                    id: rootId,
                    onKeyDown: handleKeyDown,
                    ref: containerRef,
                    role: "menu"
                },
                scrollableProps
            )}
        >
            <MenuContext.Provider
                value={{
                    onSelect: handleSelectItem,
                    selectedKeys,
                    selectionMode
                }}
            >
                {nodes.map(node => {
                    switch (node.type) {
                        case NodeType.item:
                            return renderItem(node as CollectionItem);
                        case NodeType.section:
                            return renderSection(node as CollectionSection);
                        case NodeType.divider:
                            return renderDivider(node as CollectionDivider);
                        default:
                            return null;
                    }
                })}
            </MenuContext.Provider>
        </Box>
    );
}

InnerMenu.defaultElement = DefaultElement;

export const Menu = forwardRef<any, OmitInternalProps<InnerMenuProps>>((props, ref) => (
    <InnerMenu {...props} forwardedRef={ref} />
));

export type MenuProps = ComponentProps<typeof Menu>;
