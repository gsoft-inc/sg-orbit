import { Children, useMemo } from "react";
import { getSlots, mergeProps } from "../../shared";
import { isNil } from "lodash";

const slots = {
    header: null,
    content: null
};

function makeId({ props: { id } }, type, rootId, tabIndex) {
    return id ?? `${rootId}-${type}-${tabIndex}`;
}

export class TabsBuilder {
    build(children, rootId) {
        if (isNil(children)) {
            throw new Error("A tabs component must have children.");
        }

        const tabs = [];
        const panels = [];

        let tabIndex = 0;
        let nodeIndex = 0;

        Children.forEach(children, tab => {
            const { header, content } = getSlots(tab.props.children, slots);

            const tabId = makeId(header, "tab", rootId, tabIndex);
            const panelId = makeId(content, "panel", rootId, tabIndex);

            tabs.push(
                mergeProps(header.props, tab.props, {
                    id: tabId,
                    panelId,
                    index: tabIndex,
                    as: header.type,
                    key: `.${nodeIndex++}`,
                    ref: header.ref
                })
            );

            panels.push(
                mergeProps(content.props, {
                    id: panelId,
                    tabId,
                    index: tabIndex,
                    as: content.type,
                    key: `.${nodeIndex++}`,
                    ref: content.ref
                })
            );

            tabIndex++;
        });

        return [tabs, panels];
    }
}

export function useTabsBuilder(children, rootId) {
    const builder = useMemo(() => new TabsBuilder(), []);

    return useMemo(() => builder.build(children, rootId), [builder, children, rootId]);
}
