import { Children, useMemo } from "react";
import { Item, Section } from "../../placeholders";
import { isNil } from "lodash";
import { mergeProps, resolveChildren } from "../../shared";

export class ListboxBuilder {
    _rootId;

    constructor(rootId) {
        this._rootId = rootId;
    }

    _parseSection(section, index) {
        const { children, ...props } = section.props;

        if (isNil(children)) {
            throw new Error("A listbox section must have children.");
        }

        const newKeys = [];

        const that = this;

        const items = Children.map(children, (item, itemIndex) => {
            // TODO: Not good, would prefer to have some kind of nodeIndex increment for a default itemKey. Instead of `${index}-${itemIndex}`.
            const { result, newKeys: itemKeys } = that._parseItem(item, `${index}-${itemIndex}`);

            newKeys.push(itemKeys[0]);

            return result;
        });

        return {
            result: mergeProps(props, {
                id: `${this._rootId}-section-${index}`,
                index,
                key: index,
                type: section.type,
                ref: section.ref,
                items
            }),
            newKeys
        };
    }

    _parseItem(item, index) {
        const itemKey = !isNil(item.key)
            ? item.key.replace(".", "").replace("$", "")
            : index.toString();

        return {
            result: mergeProps(item.props, {
                id: `${this._rootId}-item-${index}`,
                itemKey,
                index,
                key: index,
                // Use a custom type if available otherwise let the ListboxItem component choose his default type.
                type: item.type !== Item ? item.type : undefined,
                ref: item.ref
            }),
            newKeys: [itemKey]
        };
    }

    build(children, selectedKeys) {
        if (isNil(children)) {
            throw new Error("A listbox must have children.");
        }

        const keys = [];

        const elements = resolveChildren(children, {
            selectedKeys
        });

        const that = this;

        return Children.map(elements, (element, index) => {
            const { result, newKeys } = element.type === Section
                ? that._parseSection(element, index)
                : that._parseItem(element, index);

            newKeys.forEach(x => {
                if (keys.includes(x)) {
                    throw new Error(`A listbox item key must be unique. ${x} already exist.`);
                } else {
                    keys.push(x);
                }
            });

            return result;
        });
    }
}

export function useListboxBuilder({ children, selectedKeys, rootId }) {
    const builder = useMemo(() => new ListboxBuilder(rootId), [rootId]);

    return useMemo(() => builder.build(children, selectedKeys), [builder, children, selectedKeys]);
}
