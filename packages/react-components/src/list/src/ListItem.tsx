import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { Text } from "../../typography";
import { mergeProps } from "../../shared";

const defaultElement = "li";

export interface InnerListItemProps extends Omit<ComponentProps<typeof defaultElement>, "color"> {
    /**
     * A list item can vary in size.
     */
    size?: "inherit";
    /**
     * @ignore
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}


export function InnerListItem({
    size,
    as = defaultElement,
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

export const ListItem = forwardRef<any, Omit<InnerListItemProps, "forwardedRef">>((props, ref) => (
    <InnerListItem {...props} forwardedRef={ref} />
));

export type ListItemProps = ComponentProps<typeof ListItem>;
