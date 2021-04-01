import "./Menu.css";

import { Box } from "../../box";
import { CollectionItem, CollectionOption, CollectionSection, NodeType, useCollection } from "../../collection";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, SyntheticEvent } from "react";
import {
    FocusTarget,
    Keys,
    appendEventKey,
    cssModule,
    forwardRef,
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
import { SelectionMode } from "./selectionMode";
import { isNil, isNumber } from "lodash";

export const ItemKeyProp = "data-o-ui-key";

export interface InnerMenuProps {
    /**
     * @ignore
     */
    id?: string;
    /**
     * A controlled set of the selected item keys.
     */
    selectedKeys?: string[]
    /**
     * The initial value of `selectedKeys` when uncontrolled.
     */
    defaultSelectedKeys?: string[]
    /**
     * Called when the selected keys change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {String[]} keys - The keys of the selected items..
     * @returns {void}
     */
    onSelectionChange?(event: SyntheticEvent, keys: string[]): void
    /**
     * The type of selection that is allowed.
     */
    selectionMode?: SelectionMode;
    /**
     * Items to render.
     */
    items?: CollectionItem[],
    /**
     * Whether or not the menu should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Default focus target when enabling autofocus.
     */
    defaultFocusTarget?: FocusTarget;
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
    "aria-label"?: string;
    /**
     * @ignore
     */
    "aria-labelledby"?: string;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerMenu({
    id,
    selectedKeys: selectedKeysProp,
    defaultSelectedKeys,
    onSelectionChange,
    selectionMode = SelectionMode.none,
    items,
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

    const nodes = useCollection(children, { items });

    const rootId = useId(id, id ? null : "o-ui-menu");

    const renderOption = ({
        key,
        index,
        elementType: As = MenuItem,
        ref,
        content,
        props,
        tooltip
    }: Omit<CollectionOption, "type">) => (
        <As
            {...props}
            id={`${rootId}-item-${index}`}
            key={key}
            ref={ref}
            item={{ key, tooltip }}
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
    }: Omit<CollectionSection, "type">) => {
        if (sectionItems.length === 0) {
            return null;
        }

        return (
            <As
                {...props}
                id={`${rootId}-section-${index}`}
                key={key}
                ref={ref}
            >
                {sectionItems.map(x => renderOption(x))}
            </As>
        );
    };

    const renderDivider = ({
        key,
        elementType: As,
        ref,
        content,
        props
    }: Omit<CollectionItem, "type">) => (
        <As
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
        </As>
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
                    "aria-orientation": "vertical" as const,
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

export const Menu = forwardRef<InnerMenuProps>((props, ref) => (
    <InnerMenu {...props} forwardedRef={ref} />
));

export type MenuProps = ComponentProps<typeof Menu>

Menu.displayName = "Menu";
