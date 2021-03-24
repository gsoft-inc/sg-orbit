import { Children, ElementType, ReactElement, ReactNode, Ref, RefAttributes, useMemo } from "react";
import { Divider } from "../divider";
import { Item, Section } from "../placeholders";
import { TooltipTrigger, parseTooltipTrigger } from "../tooltip";
import { isNil } from "lodash";
import { resolveChildren } from "../shared";

export interface CollectionItem {
    key: string;
    position: number;
    index: number;
    type: NodeType;
    elementType?: ElementType | string;
    ref: Ref<any>,
    content: ElementType | ReactElement[];
    props: Record<string, any>,
}

export interface CollectionSection extends CollectionItem {
    items: CollectionItem[]
}

export type CollectionDivider = CollectionItem

export interface CollectionOption extends CollectionItem {
    tooltip: any,
}

export enum NodeType {
    item = "item",
    section = "section",
    divider = "divider"
}

export function createCollectionItem({ key, position, index, elementType, ref, content, props }: CollectionItem) {
    return {
        key,
        position,
        index,
        type: NodeType.item,
        elementType,
        ref,
        content,
        props
    };
}

export class CollectionBuilder {
    _parseItem(element: ReactElement & RefAttributes<any>, position: number, nextIndex: () => number): CollectionItem {
        const { children, ...props } = element.props;

        const index = nextIndex();

        return {
            key: !isNil(element.key) ? (element.key as string).replace(".", "").replace("$", "") : index.toString(),
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

    _parseSection(element: ReactElement & RefAttributes<any>, position: number, nextIndex: () => number): CollectionSection {
        const { children, ...props } = element.props;

        const index = nextIndex();

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;

        const items = Children.map(resolveChildren(children), (x: ReactElement, childPosition) => that._parseItem(x, childPosition, nextIndex));

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

    _parseDivider(element: ReactElement & RefAttributes<any>, position: number, nextIndex: () => number): CollectionDivider {
        const { children, ...props } = element.props;

        const index = nextIndex();

        return {
            key: index.toString(),
            position,
            index,
            type: NodeType.divider,
            // Use a custom type if available otherwise let the final component choose his type.
            elementType: Divider,
            ref: element.ref,
            content: children,
            props
        };
    }

    _parseTooltip(element: ReactElement & RefAttributes<any>, position: number, nextIndex: () => number): CollectionOption {
        const { children, ...props } = element.props;

        const [item, tooltip] = parseTooltipTrigger(children);

        const parsedItem = this._parseItem(item, position, nextIndex) as CollectionOption;

        parsedItem.tooltip = {
            props,
            content: tooltip
        };

        return parsedItem;
    }

    build(children: ReactNode, { items }: Collection) {
        if (isNil(children)) {
            return [];
        }

        let index = 0;

        const elements = resolveChildren(children, { items });

        const nextIndex = () => {
            return index++;
        };

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;

        return Children.map(elements, (element: ReactElement, position) => {
            switch (element.type) {
                case Section:
                    return that._parseSection(element, position, nextIndex);
                case Divider:
                    return that._parseDivider(element, position, nextIndex);
                case TooltipTrigger:
                    return that._parseTooltip(element, position, nextIndex);
                default:
                    return that._parseItem(element, position, nextIndex);
            }
        });
    }
}

export interface Collection {
    items?: CollectionItem[];
}

export function useCollection(children: ReactNode, { items }: Collection = {}) {
    const builder = useMemo(() => new CollectionBuilder(), []);

    return useMemo(() => builder.build(children, { items }), [builder, children, items]);
}
