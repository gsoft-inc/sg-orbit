import { Children, useMemo } from "react";
import { Item, Section } from "../../placeholders";
import { isNil } from "lodash";
import { mergeProps, resolveChildren } from "../../shared";

export class ListboxBuilder {
    _rootId;

    constructor(rootId) {
        this._rootId = rootId;
    }

    _parseSection(section, nextIndex) {
        const { children, ...props } = section.props;

        if (isNil(children)) {
            throw new Error("A listbox section must have children.");
        }

        const index = nextIndex();
        const newKeys = [];

        const that = this;

        const items = Children.map(children, item => {
            const { result, newKeys: itemKeys } = that._parseItem(item, nextIndex);

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

    _parseItem(item, nextIndex) {
        const index = nextIndex();

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

        const elements = resolveChildren(children, {
            selectedKeys
        });

        const keys = [];
        const that = this;

        let nodeIndex = 0;

        const nextIndex = () => {
            return nodeIndex++;
        };

        return Children.map(elements, element => {
            const parser = element.type === Section
                ? that._parseSection.bind(that)
                : that._parseItem.bind(that);

            const { result, newKeys } = parser(element, nextIndex);

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
