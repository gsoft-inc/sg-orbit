import { Children, ElementType, ReactElement, ReactNode, Ref, RefAttributes, useMemo } from "react";
import { Divider } from "../../divider";
import { Item, Section } from "../../collection";
import { TooltipTrigger, parseTooltipTrigger } from "../../tooltip";
import { isNil, resolveChildren } from "../../shared";

export interface CollectionNode {
    key: string;
    index: number;
    type: NodeType;
    elementType?: ElementType | string;
    ref: Ref<any>;
    props: Record<string, any>;
}

export interface CollectionItem extends CollectionNode {
    type: NodeType.item;
    content: ElementType | ReactElement[];
    tooltip?: {
        props: Record<string, any>;
        content: ReactElement;
    };
}

export interface CollectionSection extends CollectionNode {
    type: NodeType.section;
    items?: CollectionItem[];
}

export interface CollectionDivider extends CollectionNode {
    type: NodeType.divider;
    content: ElementType | ReactElement[];
}

export enum NodeType {
    item = "item",
    section = "section",
    divider = "divider"
}

export function isSection(node: CollectionNode): node is CollectionSection {
    return node.type === NodeType.section;
}

export function isDivider(node: CollectionNode): node is CollectionDivider {
    return node.type === NodeType.divider;
}

export function isItem(node: CollectionNode): node is CollectionItem {
    return node.type === NodeType.item;
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
    private parseItem(element: ReactElement, incrementIndex: () => number): CollectionItem {
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

    private parseSection(element: ReactElement, incrementIndex: () => number): CollectionSection {
        const { children, ...props } = element.props;

        const index = incrementIndex();

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;

        const items = Children.toArray(resolveChildren(children)).filter(x => x).map((x: ReactElement) => that.parseItem(x, incrementIndex));

        return {
            key: index.toString(),
            index,
            type: NodeType.section,
            // Use a custom type if available otherwise let the final component choose his type.
            elementType: element.type !== Section ? element.type : undefined,
            ref: (element as RefAttributes<any>).ref,
            props,
            items
        };
    }

    private parseDivider(element: ReactElement, incrementIndex: () => number): CollectionDivider {
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

    private parseTooltip(element: ReactElement, incrementIndex: () => number) {
        const { children, ...props } = element.props;

        const [item, tooltip] = parseTooltipTrigger(children);

        const parsedItem = this.parseItem(item, incrementIndex);

        parsedItem.tooltip = {
            props,
            content: tooltip
        };

        return parsedItem;
    }

    build(children: ReactNode): CollectionNode[] {
        if (isNil(children)) {
            return [];
        }

        let index = 0;

        const elements = resolveChildren(children);

        const incrementIndex = () => {
            return index++;
        };

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;

        return Children.toArray(elements).filter(x => x).map((element: ReactElement) => {
            switch (element.type) {
                case Section:
                    return that.parseSection(element, incrementIndex);
                case Divider:
                    return that.parseDivider(element, incrementIndex);
                case TooltipTrigger:
                    return that.parseTooltip(element, incrementIndex);
                default:
                    return that.parseItem(element, incrementIndex);
            }
        });
    }
}

export function useCollection(children: ReactNode) {
    const builder = useMemo(() => new CollectionBuilder(), []);

    return useMemo(() => builder.build(children), [builder, children]);
}
