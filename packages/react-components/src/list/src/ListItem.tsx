import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, mergeProps } from "../../shared";
import { Text } from "../../typography";

const DefaultElement = "li";

export interface InnerListItemProps extends InternalProps, Omit<StyledComponentProps<typeof DefaultElement>, "color"> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * A list item can vary in size.
     */
    size?: "inherit";
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
                    as,
                    ref: forwardedRef,
                    size
                }
            )}
        >
            {children}
        </Text>
    );
}

export const ListItem = forwardRef<any, OmitInternalProps<InnerListItemProps>>((props, ref) => (
    <InnerListItem {...props} forwardedRef={ref} />
));

export type ListItemProps = ComponentProps<typeof ListItem>;
