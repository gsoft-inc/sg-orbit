import { Children, useMemo } from "react";
import { Divider } from "../../divider";
import { Item, Section } from "../../placeholders";
import { TooltipTrigger, parseTooltipTrigger } from "../../tooltip";
import { any, array, arrayOf, number, object, oneOfType, element as reactElement, elementType as reactElementType, string } from "prop-types";
import { isNil } from "lodash";
import { resolveChildren } from "../../shared";

// ALEX: With TS would be nice to seggregate this shape into multiple interface like CollectionItem, CollectionSection, CollectionDivider.
export const NodeShape = {
    key: string.isRequired,
    index: number.isRequired,
    type: string.isRequired,
    elementType: reactElementType,
    ref: any,
    content: oneOfType([reactElement, arrayOf(reactElement), string]),
    props: object,
    tooltip: object, // option only
    items: array // Sections only
};

export const NodeType = {
    item: "item",
    section: "section",
    divider: "divider"
};

export function createCollectionItem({ key, index, elementType, ref, content, props }) {
    return {
        key,
        index,
        type: NodeType.item,
        elementType,
        ref,
        content,
        props
    };
}

export class CollectionBuilder {
    _parseItem(element, incrementIndex) {
        const { children, ...props } = element.props;

        const index = incrementIndex();

        return {
            key: !isNil(element.key) ? element.key.replace(".", "").replace("$", "") : index.toString(),
            index,
            type: NodeType.item,
            // Use a custom type if available otherwise let the final component choose his type.
            elementType: element.type !== Item ? element.type : undefined,
            ref: element.ref,
            content: children,
            props
        };
    }

    _parseSection(element, incrementIndex) {
        const { children, ...props } = element.props;

        const index = incrementIndex();

        const that = this;

        const items = Children.map(resolveChildren(children), x => that._parseItem(x, incrementIndex));

        return {
            key: index.toString(),
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

    _parseDivider(element, incrementIndex) {
        const { children, ...props } = element.props;

        const index = incrementIndex();

        return {
            key: index.toString(),
            index,
            type: NodeType.divider,
            // Use a custom type if available otherwise let the final component choose his type.
            elementType: Divider,
            ref: element.ref,
            content: children,
            props
        };
    }

    _parseTooltip(element, incrementIndex) {
        const { children, ...props } = element.props;

        const [item, tooltip] = parseTooltipTrigger(children);

        const parsedItem = this._parseItem(item, incrementIndex);

        parsedItem.tooltip = {
            props,
            content: tooltip
        };

        return parsedItem;
    }

    build(children, { items }) {
        if (isNil(children)) {
            return [];
        }

        let index = 0;

        const elements = resolveChildren(children, { items: items ?? [] });

        const incrementIndex = () => {
            return index++;
        };

        const that = this;

        return Children.map(elements, element => {
            switch (element.type) {
                case Section:
                    return that._parseSection(element, incrementIndex);
                case Divider:
                    return that._parseDivider(element, incrementIndex);
                case TooltipTrigger:
                    return that._parseTooltip(element, incrementIndex);
                default:
                    return that._parseItem(element, incrementIndex);
            }
        });
    }
}

export function useCollection(children, { items } = {}) {
    const builder = useMemo(() => new CollectionBuilder(), []);

    return useMemo(() => builder.build(children, { items }), [builder, children, items]);
}
