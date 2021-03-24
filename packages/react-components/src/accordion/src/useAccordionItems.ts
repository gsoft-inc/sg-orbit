import { Children, JSXElementConstructor, ReactElement, ReactNode, Ref, RefAttributes, useMemo } from "react";
import { Content, Header } from "../../placeholders";
import { isNil } from "lodash";
import { mergeProps } from "../../shared";

export interface AccordionBuilderItem {
    id: string;
    key: string;
    position: number;
    index: number;
    header: AccordionBuilderHeaderProps;
    panel: AccordionBuilderPanelProps;
}

export interface AccordionBuilderHeaderProps {
    elementType: string | JSXElementConstructor<any>;
    ref: Ref<any>;
    props: Record<string, any>;
}


export interface AccordionBuilderPanelProps {
    elementType: string | JSXElementConstructor<any>;
    ref: Ref<any>;
    props: any;
}



export class AccordionBuilder {
    _rootId;

    constructor(rootId: string) {
        this._rootId = rootId;
    }

    build(children: ReactNode): AccordionBuilderItem[] {
        if (isNil(children)) {
            throw new Error("An accordion must have children.");
        }

        return Children.map(children, (element: ReactElement, index) => {
            const [header, content] = Children.toArray(element.props.children) as ReactElement[];

            if (isNil(header) || isNil(content)) {
                throw new Error("An accordion item must have an <Header> and a <Content>.");
            }

            const headerProps = {
                // Use a custom type if available otherwise let the AccordionHeader component choose his default type.
                elementType: header.type !== Header ? header.type : undefined,
                ref: (header as RefAttributes<any>).ref,
                props: mergeProps(header.props, element.props)
            };

            const panelProps = {
                // Use a custom type if available otherwise let the AccordionPanel component choose his default type.
                elementType: content.type !== Content ? content.type : undefined,
                ref: (content as RefAttributes<any>).ref,
                props: content.props
            };

            return {
                id: `${this._rootId}-${index}`,
                key: index.toString(),
                position: index,
                index,
                header: headerProps,
                panel: panelProps
            };
        });
    }
}

export function useAccordionItems(children: ReactNode, rootId: string) {
    const builder = useMemo(() => new AccordionBuilder(rootId), [rootId]);

    return useMemo(() => builder.build(children), [builder, children]);
}
