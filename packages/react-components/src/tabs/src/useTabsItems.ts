import { Children, ReactElement, ReactNode, Ref, RefAttributes, useMemo } from "react";
import { Content, Header } from "../../placeholders";
import { isNil } from "lodash";
import { mergeProps, resolveChildren } from "../../shared";

export interface PanelType {
    key: string;
    index?: number;
    disabled?: boolean;
    elementType?: ReactElement["type"];
    ref?: Ref<any>;
    panelId: string;
    tabId: string;
    props?: Record<string, any>;
}

export interface TabType {
    key: string;
    index?: number;
    disabled?: boolean;
    elementType?: ReactElement["type"];
    ref?: Ref<any>;
    tabId: string;
    panelId: string;
    props?: Record<string, any>;
}

export class TabsBuilder {
    private rootId;

    constructor(rootId: string) {
        this.rootId = rootId;
    }

    build(children: ReactNode): [TabType[], PanelType[]] {
        if (isNil(children)) {
            throw new Error("A tabs component must have children.");
        }

        const tabs: TabType[] = [];
        const panels: PanelType[] = [];

        let index = 0;

        Children.forEach(children, (element: ReactElement, position) => {
            const key = !isNil(element.key) ? element.key.toString().replace(".", "").replace("$", "") : position.toString();

            const [header, content] = Children.toArray(resolveChildren(element.props.children)) as [ReactElement & RefAttributes<any>, ReactElement & RefAttributes<any>];

            if (isNil(header) || isNil(content)) {
                throw new Error("A tabs item must have an <Header> and a <Content>.");
            }

            const tabId = this.makeId(header, "tab", key);
            const panelId = this.makeId(content, "panel", key);

            tabs.push({
                key,
                index: index++,
                // Use a custom type if available otherwise let the Tab component choose his default type.
                elementType: header.type !== Header ? header.type : undefined,
                ref: header.ref,
                tabId,
                panelId,
                props: mergeProps(header.props, element.props)
            });

            index++;

            panels.push({
                key,
                index: index++,
                // Use a custom type if available otherwise let the Tab component choose his default type.
                elementType: content.type !== Content ? content.type : undefined,
                ref: content.ref,
                tabId,
                panelId,
                props: content.props
            });
        });

        return [tabs, panels];
    }

    private makeId({ props: { id } }: Record<string, any>, type: "tab" | "panel", key: string): string {
        return id ?? `${this.rootId}-${type}-${key}`;
    }
}

export function useTabsItems(children: ReactNode, rootId: string) {
    const builder = useMemo(() => new TabsBuilder(rootId), [rootId]);

    return useMemo(() => builder.build(children), [builder, children]);
}
