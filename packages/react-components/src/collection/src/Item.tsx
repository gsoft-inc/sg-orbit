import { AllHTMLAttributes, ComponentProps, ForwardedRef, ReactNode, forwardRef } from "react";
import { OmitInternalProps } from "../../shared";

export interface InnerItemProps extends AllHTMLAttributes<any> {
    /**
     * A unique key to identify the item.
     */
    key?: string;
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

export const Item = forwardRef<any, OmitInternalProps<InnerItemProps>>((props, ref) => (
    // @ts-ignore Not sure what is going on with the InnerItem.
    <InnerItem {...props} forwardedRef={ref} />
));

export type ItemProps = ComponentProps<typeof Item>;
