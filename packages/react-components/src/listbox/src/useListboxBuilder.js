import { Children, useMemo } from "react";
import { Item } from "../../placeholders";
import { isNil } from "lodash";
import { mergeProps, resolveChildren } from "../../shared";

/*
TODO:
- Handle Section
*/

export class ListboxBuilder {
    _rootId;

    constructor(rootId) {
        this._rootId = rootId;
    }

    build(children, selectedKeys) {
        if (isNil(children)) {
            throw new Error("A listbox component must have children.");
        }

        const keys = [];

        const items = Children.toArray(resolveChildren(children, {
            selectedKeys
        }));

        return Children.map(items, (item, index) => {
            const itemKey = item.key.replace(".", "").replace("$", "");

            if (keys.includes(itemKey)) {
                throw new Error(`A listbox item key must be unique. ${itemKey} already exist.`);
            } else {
                keys.push(itemKey);
            }

            return mergeProps(item.props, {
                id: `${this._rootId}-${index}`,
                itemKey,
                index,
                key: index,
                // Use a custom type if available otherwise let the ListboxItem component choose his default type.
                type: item.type !== Item ? item.type : undefined,
                ref: item.ref
            });
        });
    }
}

export function useListboxBuilder({ children, selectedKeys, rootId }) {
    const builder = useMemo(() => new ListboxBuilder(rootId), [rootId]);

    return useMemo(() => builder.build(children, selectedKeys), [builder, children, selectedKeys]);
}
