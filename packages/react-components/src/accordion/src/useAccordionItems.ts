import { Children, ReactElement, ReactNode, Ref, RefAttributes, useMemo } from "react";
import { Content, Header } from "../../placeholders";
import { isNil, mergeProps } from "../../shared";

export interface AccordionBuilderItem {
    header: AccordionBuilderHeader;
    id: string;
    index: number;
    key: string;
    panel: AccordionBuilderPanel;
}

export interface AccordionBuilderHeader {
    elementType: ReactElement["type"];
    props: Record<string, any>;
    ref: Ref<any>;
}

export interface AccordionBuilderPanel {
    elementType: ReactElement["type"];
    props: Record<string, any>;
    ref: Ref<any>;
}

export class AccordionBuilder {
    private rootId;

    constructor(rootId: string) {
        this.rootId = rootId;
    }

    build(children: ReactNode): AccordionBuilderItem[] {
        return Children.toArray(children).filter(x => x).map((element: ReactElement, index) => {
            const [header, content] = Children.toArray(element.props.children) as ReactElement[];

            if (isNil(header) || isNil(content)) {
                throw new Error("An accordion item must have an heading (<H1>, <H2>, <H3>, <H4>, <H5>, <H6> or a custom component) and a <Content>.");
            }

            if (header.type === Header) {
                throw new Error("An accordion item doesn't accept an <Header> placeholder anymore. Did you forgot to replace your <Header> by an heading?");
            }

            const key = !isNil(element.key) ? element.key.toString().replace(".", "").replace("$", "") : index.toString();

            const headerProps = {
                // elementType: isHeading(header.type) ? undefined : header.type,
                elementType: header.type,
                props: mergeProps(header.props, element.props),
                ref: (header as RefAttributes<any>).ref
            };

            const panelProps = {
                // Use a custom type if available otherwise let the AccordionPanel component choose his default type.
                elementType: content.type !== Content ? content.type : undefined,
                props: content.props,
                ref: (content as RefAttributes<any>).ref
            };

            return {
                header: headerProps,
                id: `${this.rootId}-${key}`,
                index,
                key,
                panel: panelProps
            };
        });
    }
}

export function useAccordionItems(children: ReactNode, rootId: string) {
    const builder = useMemo(() => new AccordionBuilder(rootId), [rootId]);

    return useMemo(() => builder.build(children), [builder, children]);
}
