import { Children, useMemo } from "react";
import { Content, Header } from "../../view";
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

        // let tabIndex = 0;
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

            tabs.push(
                mergeProps(header.props, tab.props, {
                    id: tabId,
                    panelId,
                    index,
                    // Use a custom type if available otherwise let the Tab component choose his default type.
                    type: header.type !== Header ? header.type : undefined,
                    key: `.${nodeIndex++}`,
                    ref: header.ref
                })
            );

            panels.push(
                mergeProps(content.props, {
                    id: panelId,
                    tabId,
                    index,
                    // Use a custom type if available otherwise let the Tab component choose his default type.
                    type: content.type !== Content ? content.type : undefined,
                    key: `.${nodeIndex++}`,
                    ref: content.ref
                })
            );
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
