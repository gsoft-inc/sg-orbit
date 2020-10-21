import { Children, useMemo } from "react";
import { getSlots } from "../../shared";

const slots = {
    header: null,
    content: null
};

export class TabsBuilder {
    build(children) {
        const headers = [];
        const panels = [];

        let index = 0;

        Children.forEach(children, x => {
            const { header, content } = getSlots(x.props.children, slots);

            headers.push(this.createItem(
                header,
                index++
            ));

            panels.push(this.createItem(
                content,
                index++
            ));
        });

        return [headers, panels];
    }

    createItem({ type, props: { key, ...props }, ref }, index) {
        return {
            as: type,
            props,
            key: key ?? `.${index}`,
            ref,
            index
        };
    }
}

export function useTabsBuilder(children) {
    const builder = useMemo(() => new TabsBuilder(), []);

    return useMemo(() => {
        return builder.build(children);
    }, [builder, children]);
}
