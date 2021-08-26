import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitForwardedRefProp, mergeProps } from "../../shared";
import { Text } from "../../typography";

const DefaultElement = "li";

export interface InnerListItemProps extends InternalProps, Omit<ComponentProps<typeof DefaultElement>, "color"> {
    /**
     * A list item can vary in size.
     */
    size?: "inherit";
    /**
     * React children.
     */
    children: ReactNode;
}


export function InnerListItem({
    size,
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerListItemProps) {
    return (
        <Text
            {...mergeProps(
                rest,
                {
                    size,
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Text>
    );
}

export const ListItem = forwardRef<any, OmitForwardedRefProp<InnerListItemProps>>((props, ref) => (
    <InnerListItem {...props} forwardedRef={ref} />
));

export type ListItemProps = ComponentProps<typeof ListItem>;
