import { Children, useMemo } from "react";
import { Item, Section } from "../placeholders";
import { any, array, element as elementProp, elementType, number, object, oneOfType, string } from "prop-types";
import { isNil } from "lodash";
import { resolveChildren } from "../shared";

export const NodeShape = {
    key: string.isRequired,
    position: number.isRequired,
    index: number.isRequired,
    type: string.isRequired,
    elementType: elementType,
    ref: any,
    content: oneOfType([elementProp, string]),
    props: object,
    items: array // Section only
};

export const NodeType = {
    item: "item",
    section: "section"
};

export class CollectionBuilder {
    _parseSection(element, position, nextIndex) {
        const { children, ...props } = element.props;

        const index = nextIndex();

        const that = this;

        const items = Children.map(children, (x, childPosition) => that._parseItem(x, childPosition, nextIndex));

        return {
            key: index.toString(),
            position,
            index,
            type: NodeType.section,
            // Use a custom type if available otherwise let the final component choose his type.
            elementType: element.type !== Section ? element.type : undefined,
            ref: element.ref,
            content: null,
            props,
            items
        };
    }

    _parseItem(element, position, nextIndex) {
        const { children, ...props } = element.props;

        const index = nextIndex();

        return {
            key: !isNil(element.key) ? element.key.replace(".", "").replace("$", "") : index.toString(),
            position,
            index,
            type: NodeType.item,
            // Use a custom type if available otherwise let the final component choose his type.
            elementType: element.type !== Item ? element.type : undefined,
            ref: element.ref,
            content: children,
            props
        };
    }

    build(children) {
        if (isNil(children)) {
            return [];
        }

        let index = 0;

        const elements = resolveChildren(children);

        const nextIndex = () => {
            return index++;
        };

        const that = this;

        return Children.map(elements, (element, position) =>
            element.type === Section
                ? that._parseSection(element, position, nextIndex)
                : that._parseItem(element, position, nextIndex));
    }
}

export function useCollection(children) {
    const builder = useMemo(() => new CollectionBuilder(), []);

    return useMemo(() => builder.build(children), [builder, children]);
}
