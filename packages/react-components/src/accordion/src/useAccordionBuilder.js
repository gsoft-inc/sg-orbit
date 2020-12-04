import { Children, useMemo } from "react";
import { Content, Header } from "../../placeholders";
import { isNil } from "lodash";
import { mergeProps, resolveChildren } from "../../shared";

export class AccordionBuilder {
    _rootId;

    constructor(rootId) {
        this._rootId = rootId;
    }

    build(items, selectedIndex) {
        if (isNil(items)) {
            throw new Error("An accordion component must have children.");
        }

        return Children.map(items, (item, index) => {
            const [header, content] = Children.toArray(resolveChildren(item.props.children, {
                isOpen: selectedIndex.includes(index)
            }));

            if (isNil(header) || isNil(content)) {
                throw new Error("An accordion item must have an <Header> and a <Content>.");
            }

            const headerProps = mergeProps(header.props, item.props, {
                // Use a custom type if available otherwise let the AccordionHeader component choose his default type.
                type: header.type !== Header ? header.type : undefined,
                ref: header.ref
            });

            const panelProps = mergeProps(content.props, {
                // Use a custom type if available otherwise let the AccordionPanel component choose his default type.
                type: content.type !== Content ? content.type : undefined,
                ref: content.ref
            });

            return {
                id: `${this._rootId}-${index}`,
                index,
                key: `.${index}`,
                header: headerProps,
                panel: panelProps
            };
        });
    }
}

export function useAccordionBuilder(accordionItems, selectedIndex, rootId) {
    const builder = useMemo(() => new AccordionBuilder(rootId), [rootId]);

    return useMemo(() => builder.build(accordionItems, selectedIndex), [builder, accordionItems, selectedIndex]);
}
