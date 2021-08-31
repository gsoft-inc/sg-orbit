import { ComponentProps, ForwardedRef, ReactNode, forwardRef } from "react";
import { OmitInternalProps, OrbitHtmlAttributes } from "../../shared";

export interface InnerItemProps extends OrbitHtmlAttributes {
    /**
     * React children.
     */
    children: ReactNode;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
    /**
     * A unique key to identify the item.
     */
    key?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function InnerItem(props: InnerItemProps): JSX.Element {
    return null;
}

export const Item = forwardRef<any, OmitInternalProps<InnerItemProps>>((props, ref) => (
    // @ts-ignore Not sure what is going on with the InnerItem.
    <InnerItem {...props} forwardedRef={ref} />
));

export type ItemProps = ComponentProps<typeof Item>;
