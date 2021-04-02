import { Children, ElementType, ReactElement, ReactNode, Ref, RefAttributes, useMemo } from "react";
import { Divider } from "../../divider";
import { Item, Section } from "../../placeholders";
import { TooltipTrigger, parseTooltipTrigger } from "../../tooltip";
import { isNil } from "lodash";
import { resolveChildren } from "../../shared";

export interface CollectionItem {
    key: string;
    index: number;
    type: NodeType;
    elementType?: ElementType | string;
    ref: Ref<any>,
    content: ElementType | ReactElement[];
    props: Record<string, any>,
    tooltip?: {
        props: Record<string, any>;
        content: ReactElement;
    },
}

export interface CollectionSection extends CollectionItem {
    type: NodeType.section;
    items?: CollectionItem[]
}

export interface CollectionDivider extends CollectionItem {
    type: NodeType.divider;
}

export enum NodeType {
    item = "item",
    section = "section",
    divider = "divider"
}

export function isSection(node: CollectionItem): node is CollectionSection {
    return node.type === NodeType.section;
}

export function createCollectionItem({ key, index, elementType, ref, content, props }: CollectionItem) {
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
    _parseItem(element: ReactElement, incrementIndex: () => number): CollectionItem {
        const { children, ...props } = element.props;

        const index = incrementIndex();

        return {
            key: !isNil(element.key) ? element.key.toString().replace(".", "").replace("$", "") : index.toString(),
            index,
            type: NodeType.item,
            // Use a custom type if available otherwise let the final component choose his type.
            elementType: element.type !== Item ? element.type : undefined,
            ref: (element as RefAttributes<any>).ref,
            content: children,
            props
        };
    }

    _parseSection(element: ReactElement, incrementIndex: () => number): CollectionSection {
        const { children, ...props } = element.props;

        const index = incrementIndex();

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;

        const items = Children.map(resolveChildren(children), (x: ReactElement) => that._parseItem(x, incrementIndex));

        return {
            key: index.toString(),
            index,
            type: NodeType.section,
            // Use a custom type if available otherwise let the final component choose his type.
            elementType: element.type !== Section ? element.type : undefined,
            ref: (element as RefAttributes<any>).ref,
            content: null,
            props,
            items
        };
    }

    _parseDivider(element: ReactElement, incrementIndex: () => number): CollectionDivider {
        const { children, ...props } = element.props;

        const index = incrementIndex();

        return {
            key: index.toString(),
            index,
            type: NodeType.divider,
            // Use a custom type if available otherwise let the final component choose his type.
            elementType: Divider,
            ref: (element as RefAttributes<any>).ref,
            content: children,
            props
        };
    }

    _parseTooltip(element: ReactElement, incrementIndex: () => number) {
        const { children, ...props } = element.props;

        const [item, tooltip] = parseTooltipTrigger(children);

        const parsedItem = this._parseItem(item, incrementIndex);

        parsedItem.tooltip = {
            props,
            content: tooltip
        };

        return parsedItem;
    }

    build(children: ReactNode, { items }: UseCollectionOptions) {
        if (isNil(children)) {
            return [];
        }

        let index = 0;

        const elements = resolveChildren(children, { items: items ?? [] });

        const incrementIndex = () => {
            return index++;
        };

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;

        return Children.map(elements, (element: ReactElement) => {
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

export interface UseCollectionOptions {
    items?: Record<string, any>[];
}

export function useCollection(children: ReactNode, { items }: UseCollectionOptions = {}) {
    const builder = useMemo(() => new CollectionBuilder(), []);

    return useMemo(() => builder.build(children, { items }), [builder, children, items]);
}
