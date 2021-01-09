import { Children, useMemo } from "react";
import { Content, Header } from "../../placeholders";
import { isNil } from "lodash";
import { mergeProps, resolveChildren } from "../../shared";

export class AccordionBuilder {
    _rootId;

    constructor(rootId) {
        this._rootId = rootId;
    }

    build(elements, selectedIndexes) {
        if (isNil(elements)) {
            throw new Error("An accordion must have children.");
        }

        return Children.map(elements, (item, index) => {
            const [header, content] = Children.toArray(resolveChildren(item.props.children, {
                isOpen: selectedIndexes.includes(index)
            }));

            if (isNil(header) || isNil(content)) {
                throw new Error("An accordion item must have an <Header> and a <Content>.");
            }

            const headerProps = {
                // Use a custom type if available otherwise let the AccordionHeader component choose his default type.
                elementType: header.type !== Header ? header.type : undefined,
                ref: header.ref,
                props: mergeProps(header.props, item.props)
            };

            const panelProps = {
                // Use a custom type if available otherwise let the AccordionPanel component choose his default type.
                elementType: content.type !== Content ? content.type : undefined,
                ref: content.ref,
                props: content.props
            };

            return {
                id: `${this._rootId}-${index}`,
                key: index.toString(),
                index,
                header: headerProps,
                panel: panelProps
            };
        });
    }
}

export function useAccordionBuilder({ items, selectedIndexes, rootId }) {
    const builder = useMemo(() => new AccordionBuilder(rootId), [rootId]);

    return useMemo(() => builder.build(items, selectedIndexes), [builder, items, selectedIndexes]);
}
