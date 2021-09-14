import { Children, ElementType, ReactElement, ReactNode, Ref, RefAttributes, useMemo } from "react";
import { Divider } from "../../divider";
import { Item, Section } from "../../collection";
import { TooltipTrigger, parseTooltipTrigger } from "../../tooltip";
import { isNil, resolveChildren } from "../../shared";

export interface CollectionNode {
    elementType?: ElementType | string;
    index: number;
    key: string;
    props: Record<string, any>;
    ref: Ref<HTMLElement>;
    type: NodeType;
}

export interface CollectionItem extends CollectionNode {
    content: ElementType | ReactElement[];
    tooltip?: {
        content: ReactElement;
        props: Record<string, any>;
    };
    type: NodeType.item;
}

export interface CollectionSection extends CollectionNode {
    items?: CollectionItem[];
    type: NodeType.section;
}

export interface CollectionDivider extends CollectionNode {
    content: ElementType | ReactElement[];
    type: NodeType.divider;
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

export function createCollectionItem({ content, elementType, index, key, props, ref }: CollectionItem) {
    return {
        content,
        elementType,
        index,
        key,
        props,
        ref,
        type: NodeType.item
    };
}

export class CollectionBuilder {
    private parseItem(element: ReactElement, incrementIndex: () => number): CollectionItem {
        const { children, ...props } = element.props;

        const index = incrementIndex();

        return {
            content: children,
            // Use a custom type if available otherwise let the final component choose his type.
            elementType: element.type !== Item ? element.type : undefined,
            index,
            key: !isNil(element.key) ? element.key.toString().replace(".", "").replace("$", "") : index.toString(),
            props,
            ref: (element as RefAttributes<any>).ref,
            type: NodeType.item
        };
    }

    private parseSection(element: ReactElement, incrementIndex: () => number): CollectionSection {
        const { children, ...props } = element.props;

        const index = incrementIndex();

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;

        const items = Children.toArray(resolveChildren(children)).filter(x => x).map((x: ReactElement) => that.parseItem(x, incrementIndex));

        return {
            // Use a custom type if available otherwise let the final component choose his type.
            elementType: element.type !== Section ? element.type : undefined,
            index,
            items,
            key: index.toString(),
            props,
            ref: (element as RefAttributes<any>).ref,
            type: NodeType.section
        };
    }

    private parseDivider(element: ReactElement, incrementIndex: () => number): CollectionDivider {
        const { children, ...props } = element.props;

        const index = incrementIndex();

        return {
            content: children,
            elementType: Divider,
            index,
            key: index.toString(),
            props,
            ref: (element as RefAttributes<any>).ref,
            type: NodeType.divider
        };
    }

    private parseTooltip(element: ReactElement, incrementIndex: () => number) {
        const { children, ...props } = element.props;

        const [item, tooltip] = parseTooltipTrigger(children);

        const parsedItem = this.parseItem(item, incrementIndex);

        parsedItem.tooltip = {
            content: tooltip,
            props
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
