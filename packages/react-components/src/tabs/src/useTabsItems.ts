import { Children, ReactElement, ReactNode, Ref, RefAttributes, useMemo } from "react";
import { Content, Header } from "../../placeholders";
import { isNil } from "lodash";
import { mergeProps, resolveChildren } from "../../shared";

export interface PanelType {
    id: string
    key: string
    position: any
    index: number;
    disabled?: boolean;
    elementType?: ReactElement["type"];
    ref: Ref<any>
    tabId: string
    props: Record<string, any>
}

export interface TabType {
    id: string
    key: string
    position: any
    index: number;
    disabled?: boolean;
    elementType?: ReactElement["type"];
    ref: Ref<any>
    panelId: string
    props: Record<string, any>
}

export class TabsBuilder {
    _rootId;

    constructor(rootId: string) {
        this._rootId = rootId;
    }

    build(children: ReactNode, selectedIndex: number) {
        if (isNil(children)) {
            throw new Error("A tabs component must have children.");
        }

        const tabs: TabType[] = [];
        const panels: PanelType[] = [];

        let index = 0;

        Children.forEach(children, (element: ReactElement, position) => {
            const [header, content] = Children.toArray(resolveChildren(element.props.children, {
                isActive: selectedIndex === position
            })) as [ReactElement & RefAttributes<any>, ReactElement & RefAttributes<any>];

            if (isNil(header) || isNil(content)) {
                throw new Error("A tabs item must have an <Header> and a <Content>.");
            }

            const tabId = this._makeId(header, "tab", position);
            const panelId = this._makeId(content, "panel", position);

            index++;

            tabs.push({
                id: tabId,
                key: index.toString(),
                position,
                index,
                // Use a custom type if available otherwise let the Tab component choose his default type.
                elementType: header.type !== Header ? header.type : undefined,
                ref: header.ref,
                panelId,
                props: mergeProps(header.props, element.props)
            });

            index++;

            panels.push({
                id: panelId,
                key: index.toString(),
                position,
                index,
                // Use a custom type if available otherwise let the Tab component choose his default type.
                elementType: content.type !== Content ? content.type : undefined,
                ref: content.ref,
                tabId,
                props: content.props
            });
        });

        return [tabs, panels] as const;
    }

    _makeId({ props: { id } }: Record<string, any>, type: "tab" | "panel", index: number) {
        return id ?? `${this._rootId}-${type}-${index}`;
    }
}

export function useTabsItems(children: ReactNode, selectedIndex: number, rootId: string) {
    const builder = useMemo(() => new TabsBuilder(rootId), [rootId]);

    return useMemo(() => builder.build(children, selectedIndex), [builder, children, selectedIndex]);
}
