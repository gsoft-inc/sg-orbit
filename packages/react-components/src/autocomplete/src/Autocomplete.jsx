import "./Autocomplete.css";

import { AutocompleteBase } from "./AutocompleteBase";
import { NodeType, useCollection } from "../../collection";
import { any, arrayOf, bool, element, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useMemo, useState } from "react";
import { getRawSlots, useEventCallback } from "../../shared";
import { isNil } from "lodash";

/*
Do I have to maintain a dummy selected key for listbox????
Or always provide null
*/

const propTypes = {
    /**
     * Whether or not to open the autocomplete element.
     */
    open: bool,
    /**
     * The initial value of open when in auto controlled mode.
     */
    defaultOpen: bool,
    /**
     * A controlled autocomplete value.
     */
    value: string,
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue: string,
    /**
     * Temporary text that occupies the autocomplete trigger when no value is selected.
     */
    placeholder: string,
    items: arrayOf(object),
    /**
     * Whether or not the query should be cleared when a result is selected.
     */
    clearOnSelect: bool,
    /**
     * Message to display when there are no results matching the query.
     */
    noResultsMessage: string,
    /**
     * Minimum characters to query for results.
     */
    minCharacters: number,
    /**
     * Whether or not a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether or not the autocomplete should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when the autocomplete value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {string} selectedKey - The new value.
     * @returns {void}
     */
    onChange: func,
    /**
     * Called when the autocomplete open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isOpen - Indicate if the menu is open.
     * @returns {void}
     */
    onOpenChange: func,
    onSearch: func,
    /**
     * Called before the autocomplete results are rendered.
     * @param {Result[]} results - The results to render.
     * @param {string} query - The search query.
     * @returns {Result[]} - New results to render.
     */
    // onResults: func,
    /**
     * A trigger icon.
     */
    icon: element,
    /**
     * The direction the autocomplete menu will open relative to the input.
     */
    direction: oneOf(["bottom", "top"]),
    /**
     * The horizontal alignment of the autocomplete menu relative to the input.
     */
    align: oneOf(["start", "end"]),
    /**
     * Whether or not the autocomplete should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Whether or not the autocomplete take up the width of its container.
     */
    fluid: bool,
    /**
     * Whether or not the autocomplete is disabled.
     */
    disabled: bool,
    /**
     * Whether or not the autocomplete menu can flip when it will overflow it's boundary area.
     */
    allowFlip: bool,
    /**
     * Whether or not the selection menu position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow: bool,
    /**
     * z-index of the overlay element.
     */
    zIndex: number,
    /**
     * Additional props to render on the menu of options.
     */
    menuProps: object,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

// function useSearchItems(items) {
//     return useMemo(() => {
//         return query => {
//             const searchableItems = items.map(items, x => {
//                 const { text, stringValue } = getRawSlots(x, ["text"]);

//                 return {
//                     text: text ?? stringValue,
//                     item: x
//                 };
//             });

//             return searchableItems.filter(x => x.text.toLowerCase().startsWith(query.toLowerCase()));
//         };
//     }, [items]);
// }

function isMatchingItem(item, query) {
    const { text, stringValue } = getRawSlots(item?.content, ["text"]);

    const searchableText = text ?? stringValue ?? "";

    return searchableText.toLowerCase().startsWith(query);
}

function useLocalSearch(nodes) {
    return useMemo(() => {
        return query => {
            query = query.toLowerCase();

            return nodes.reduce((acc, node) => {
                if (node.type === NodeType.section) {
                    const items = node.items.reduce((sectionItems, item) => {
                        if (isMatchingItem(item, query)) {
                            sectionItems.push(item);
                        }

                        return sectionItems;
                    }, []);

                    if (items.length > 0) {
                        // eslint-disable-next-line no-unused-vars
                        const { items: _, ...sectionProps } = node;

                        acc.push({
                            ...sectionProps,
                            items
                        });
                    }
                } else if (node.type === NodeType.item) {
                    if (isMatchingItem(node, query)) {
                        acc.push(node);
                    }
                } else {
                    acc.push(node);
                }

                return acc;
            }, []);
        };
    }, [nodes]);
}

// TODO: Pretty sure I could be able to move this into AutocompleteBase.
export function InnerAutocomplete({
    items: itemsProp,
    onSearch,
    children,
    forwardedRef,
    ...rest
}) {
    const [localQuery, setLocalQuery] = useState();

    if (!isNil(itemsProp) && isNil(onSearch)) {
        throw new Error("An autocomplete with dynamic items must receive an \"onSearch\" handler.");
    }

    const nodes = useCollection(children, { items: itemsProp });

    const localSearch = useLocalSearch(nodes);

    const handleSearch = useEventCallback(newQuery => {
        if (!isNil(onSearch)) {
            onSearch(newQuery);
        } else {
            setLocalQuery(newQuery);
        }
    });

    // console.log(!isNil(localQuery) ? localSearch(localQuery) : nodes);

    return (
        <AutocompleteBase
            {...rest}
            nodes={!isNil(localQuery) ? localSearch(localQuery) : nodes}
            onSearch={handleSearch}
            ref={forwardedRef}
        />
    );
}

InnerAutocomplete.propTypes = propTypes;

export const Autocomplete = forwardRef((props, ref) => (
    <InnerAutocomplete {...props} forwardedRef={ref} />
));

Autocomplete.displayName = "Autocomplete";
