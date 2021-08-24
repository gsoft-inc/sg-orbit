import { ComponentProps, ForwardedRef, ReactNode, forwardRef } from "react";
import { DomProps } from "../../shared";

export interface InnerItemProps extends DomProps {
    /**
     * A unique key to identify the item.
     */
    key?: string;
    /**
     * Whether or not the item is disabled.
     */
    disabled?: boolean;
    /**
     * React children.
     */
    children: ReactNode;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function InnerItem(props: InnerItemProps): JSX.Element {
    return null;
}

export const Item = forwardRef<any, Omit<InnerItemProps, "forwardedRef">>((props, ref) => (
    // @ts-ignore Not sure what is going on with the InnerItem.
    <InnerItem {...props} forwardedRef={ref} />
));

export type ItemProps = ComponentProps<typeof Item>;

Item.displayName = "Item";
