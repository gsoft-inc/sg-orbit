import { Children, useMemo } from "react";
import { Content, Header } from "../../placeholders";
import { isNil } from "lodash";
import { mergeProps, resolveChildren } from "../../shared";

export class TabsBuilder {
    _rootId;

    constructor(rootId) {
        this._rootId = rootId;
    }

    build(children, selectedIndex) {
        if (isNil(children)) {
            throw new Error("A tabs component must have children.");
        }

        const tabs = [];
        const panels = [];

        let index = 0;

        Children.forEach(children, (element, position) => {
            const [header, content] = Children.toArray(resolveChildren(element.props.children, {
                isActive: selectedIndex === position
            }));

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

        return [tabs, panels];
    }

    _makeId({ props: { id } }, type, index) {
        return id ?? `${this._rootId}-${type}-${index}`;
    }
}

export function useTabsItems(children, selectedIndex, rootId) {
    const builder = useMemo(() => new TabsBuilder(rootId), [rootId]);

    return useMemo(() => builder.build(children, selectedIndex), [builder, children, selectedIndex]);
}
