import { Children, useMemo } from "react";
import { Content, Header } from "../../placeholders";
import { isNil } from "lodash";
import { mergeProps, resolveChildren } from "../../shared";

export class TabsBuilder {
    _rootId;

    constructor(rootId) {
        this._rootId = rootId;
    }

    build(elements, selectedIndex) {
        if (isNil(elements)) {
            throw new Error("A tabs component must have children.");
        }

        const tabs = [];
        const panels = [];

        let nodeIndex = 0;

        Children.forEach(elements, (tab, index) => {
            const [header, content] = Children.toArray(resolveChildren(tab.props.children, {
                isActive: selectedIndex === index
            }));

            if (isNil(header) || isNil(content)) {
                throw new Error("A tabs item must have an <Header> and a <Content>.");
            }

            const tabId = this._makeId(header, "tab", index);
            const panelId = this._makeId(content, "panel", index);

            tabs.push({
                id: tabId,
                key: (nodeIndex++).toString(),
                index,
                // Use a custom type if available otherwise let the Tab component choose his default type.
                elementType: header.type !== Header ? header.type : undefined,
                ref: header.ref,
                panelId,
                props: mergeProps(header.props, tab.props)
            });

            panels.push({
                id: panelId,
                key: (nodeIndex++).toString(),
                index,
                // Use a custom type if available otherwise let the Tab component choose his default type.
                elementType: content.type !== Content ? content.type : undefined,
                ref: content.ref,
                tabId,
                props: content.props
            });
        });

        return [tabs, panels];
    }

    _makeId({ props: { id } }, type, index) {
        return id ?? `${this._rootId}-${type}-${index}`;
    }
}

export function useTabsBuilder(tabs, selectedIndex, rootId) {
    const builder = useMemo(() => new TabsBuilder(rootId), [rootId]);

    return useMemo(() => builder.build(tabs, selectedIndex), [builder, tabs, selectedIndex]);
}
