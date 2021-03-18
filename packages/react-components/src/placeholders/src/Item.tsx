import { ComponentProps, ForwardedRef, ReactNode } from "react";
import { forwardRef } from "../../shared";

export interface InnerItemProps {
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
    forwardedRef: ForwardedRef<any>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function InnerItem(_props: InnerItemProps) {
    // When returning null, react-docgen doesn't ignore the component.
    return <></>;
}

export const Item = forwardRef<InnerItemProps>((props, ref) => (
    // @ts-ignore Not sure what is going on with the InnerItem.
    <InnerItem {...props} forwardedRef={ref} />
));

export type ItemProps = ComponentProps<typeof Item>;

Item.displayName = "Item";
