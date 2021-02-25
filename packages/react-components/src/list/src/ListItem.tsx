import { ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode } from "react";
import { Text } from "../../text";
import { forwardRef, mergeProps } from "../../shared";

interface InnerListItemProps {
    /**
     * A list item can vary in size.
     */
    size?: "inherit",
    /**
     * An HTML element type or a custom React element type to render as.
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
    as = "li",
    children,
    forwardedRef,
    ...rest
}: InnerListItemProps): ReactElement {
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

export const ListItem = forwardRef<InnerListItemProps>((props, ref) => (
    <InnerListItem {...props} forwardedRef={ref} />
));

export type ListItemProps = ComponentProps<typeof ListItem>
