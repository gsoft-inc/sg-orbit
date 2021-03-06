import "./Menu.css";

import {
    AriaLabelingProps,
    DomProps,
    Keys,
    appendEventKey,
    cssModule,
    forwardRef,
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
import { Box } from "../../box";
import { CollectionDivider, CollectionItem, CollectionNode as CollectionNodeAliasForDocumentation, CollectionSection, NodeType, useCollection, useScrollableCollection } from "../../collection";
import { ComponentProps, ElementType, ForwardedRef, KeyboardEvent, ReactNode, SyntheticEvent } from "react";
import { MenuContext } from "./MenuContext";
import { MenuItem } from "./MenuItem";
import { MenuSection } from "./MenuSection";

export type SelectionMode = "none" | "single" | "multiple";

export const ItemKeyProp = "data-o-ui-key";

// Used to generate CollectionNode[] instead of any[] in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CollectionNode extends CollectionNodeAliasForDocumentation { }

export interface InnerMenuProps extends DomProps, AriaLabelingProps {
    /**
     * A controlled set of the selected item keys.
     */
    selectedKeys?: string[] | null;
    /**
     * The initial value of `selectedKeys` when uncontrolled.
     */
    defaultSelectedKeys?: string[];
    /**
     * Whether or not the menu should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * Called when the selected keys change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {String[]} keys - The keys of the selected items..
     * @returns {void}
     */
    onSelectionChange?: (event: SyntheticEvent, keys: string[]) => void;
    /**
     * The type of selection that is allowed.
     */
    selectionMode?: SelectionMode;
    /**
     * A collection of nodes to render instead of children. It should only be used if you embed a Menu inside another component.
     */
    nodes?: CollectionNode[];
    /**
     * Whether or not the menu should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Default focus target when enabling autofocus.
     */
    defaultFocusTarget?: string;
    /**
     * Whether or not the listbox take up the width of its container.
     */
    fluid?: boolean;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

function useCollectionNodes(children: ReactNode, nodes: CollectionNode[]) {
    const collectionNodes = useCollection(children);

    return nodes ?? collectionNodes;
}

export function InnerMenu({
    id,
    selectedKeys: selectedKeysProp,
    defaultSelectedKeys,
    validationState,
    onSelectionChange,
    selectionMode = "none",
    nodes: nodesProp,
    autoFocus,
    defaultFocusTarget,
    fluid,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    as = "ul",
    children,
    forwardedRef,
    ...rest
}: InnerMenuProps) {
    const [selectedKeys, setSelectedKeys] = useControllableState(selectedKeysProp, defaultSelectedKeys, []);
    const [searchQueryRef, setSearchQuery] = useRefState("");

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

    const searchDisposables = useDisposables();

    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
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
            case Keys.enter:
            case Keys.space:
                event.preventDefault();
                handleSelectItem(event, document.activeElement.getAttribute(ItemKeyProp));
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

    useKeyedRovingFocus(focusScope, selectedKeys[0], {
        keyProp: ItemKeyProp
    });

    useAutoFocusChild(focusManager, {
        target: selectedKeys[0] ?? defaultFocusTarget,
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const scrollableProps = useScrollableCollection(containerRef, {
        maxHeight: 12 * 32, // 32px is the default menu item height.
        paddingHeight: 2 * 1, // A menu have a border-size of 1px
        itemSelector: ".o-ui-menu-item",
        sectionSelector: ".o-ui-menu-section-title",
        dividerSelector: ".o-ui-menu-divider",
        disabled: selectionMode === "none"
    });

    const nodes = useCollectionNodes(children, nodesProp);

    const rootId = useId(id, "o-ui-menu");

    const renderItem = ({
        key,
        index,
        elementType: As = MenuItem,
        ref,
        content,
        props,
        tooltip
    }: CollectionItem) => (
        <As
            {...mergeProps(
                props,
                {
                    id: `${rootId}-item-${index + 1}`,
                    key,
                    ref,
                    item: { key, tooltip }
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
        key,
        elementType: As,
        ref,
        content,
        props
    }: CollectionDivider) => (
        <As
            {...mergeProps(
                props,
                {
                    className: "o-ui-menu-divider",
                    as: "li",
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
            {...mergeProps<any>(
                rest,
                {
                    id: rootId,
                    className: cssModule(
                        "o-ui-menu",
                        fluid && "fluid",
                        selectionMode !== "none" && "with-selection",
                        validationState
                    ),
                    onKeyDown: handleKeyDown,
                    role: "menu",
                    "aria-orientation": "vertical",
                    "aria-label": ariaLabel,
                    "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy : undefined,
                    "aria-invalid": validationState === "invalid" ? true : undefined,
                    as,
                    ref: containerRef
                },
                scrollableProps
            )}
        >
            <MenuContext.Provider
                value={{
                    selectedKeys,
                    selectionMode,
                    onSelect: handleSelectItem
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

export const Menu = forwardRef<InnerMenuProps>((props, ref) => (
    <InnerMenu {...props} forwardedRef={ref} />
));

export type MenuProps = ComponentProps<typeof Menu>;

Menu.displayName = "Menu";
