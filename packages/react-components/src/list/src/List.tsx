import { Children, ElementType, ForwardedRef, ReactElement, forwardRef } from "react";
import { InnerPropsToProps, augmentElement, cssModule, mergeProps, useStyleProps } from "../../shared";
import { isElement } from "react-is";

interface InnerListProps {
    /**
     * A list can vary in size.
     */
    size?: "inherit";
    /**
     * A list can vary in color.
     */
    color?: "inherit";
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children?: ReactElement;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export type ListProps = InnerPropsToProps<InnerListProps>;

const List = forwardRef<any, ListProps>((props, ref) => {
    const [styleProps] = useStyleProps("list");

    const {
        size,
        color,
        as: Wrapper,
        children,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    return (
        <Wrapper
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-list",
                        size,
                        color ? `color-${color}`: ""
                    ),
                    ref
                }
            )}
        >
            {Children.map(children, x => {
                if(isElement(x)){
                    return x && augmentElement(x, {
                        size
                    });
                }

                return x;
            })}
        </Wrapper>
    );
});

List.displayName = "List";

////////

function InnerOrderedList({ as = "ol", forwardedRef, ...rest }: InnerListProps): ReactElement {
    return (
        <List
            {...rest}
            as={as}
            ref={forwardedRef}
        />
    );
}

export const OrderedList = forwardRef<any, ListProps>((props, ref) => (
    <InnerOrderedList {...props} forwardedRef={ref} />
));

OrderedList.displayName = "OrderedList";

////////

function InnerUnorderedList({ as = "ul", forwardedRef, ...rest }: InnerListProps): ReactElement {
    return (
        <List
            {...rest}
            as={as}
            ref={forwardedRef}
        />
    );
}

export const UnorderedList = forwardRef<any, ListProps>((props, ref) => (
    <InnerUnorderedList {...props} forwardedRef={ref} />
));

UnorderedList.displayName = "UnorderedList";
