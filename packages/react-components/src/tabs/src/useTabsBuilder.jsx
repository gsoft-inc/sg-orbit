import { Children, useMemo } from "react";
import { getSlots } from "../../shared";

const slots = {
    header: null,
    content: null
};

export class TabsBuilder {
    build(children, rootId) {
        const tabs = [];
        const panels = [];

        let tabIndex = 0;
        let nodeIndex = 0;

        Children.forEach(children, x => {
            const { header, content } = getSlots(x.props.children, slots);

            const tabId = header.props.id ?? `${rootId}-tab-${tabIndex}`;
            const panelId = content.props.id ?? `${rootId}-panel-${tabIndex}`;

            tabs.push(this.createItem(
                header,
                tabId,
                panelId,
                tabIndex,
                nodeIndex++
            ));

            panels.push(this.createItem(
                content,
                tabId,
                panelId,
                tabIndex,
                nodeIndex++
            ));

            tabIndex++;
        });

        return [tabs, panels];
    }

    createItem({ type, props: { key, ...props }, ref }, tabId, panelId, tabIndex, nodeIndex) {
        return {
            as: type,
            props,
            tabId,
            panelId,
            key: key ?? `.${nodeIndex}`,
            ref,
            tabIndex
        };
    }
}

export function useTabsBuilder(children, rootId) {
    const builder = useMemo(() => new TabsBuilder(), []);

    return useMemo(() => builder.build(children, rootId), [builder, children, rootId]);
}
