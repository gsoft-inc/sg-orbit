import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, cloneElement } from "react";
import { Inline } from "../../layout";
import { forwardRef, slot } from "../../shared";

export interface InnerIconListProps {
    /**
     * Whether or not the IconList is disabled.
     */
    disabled?: boolean;
    /**
     * Size of the icons.
     */
    size?: string;
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

export function InnerIconList({
    size,
    disabled,
    children,
    as = "span",
    forwardedRef,
    ...rest
}: InnerIconListProps) {
    return (
        <Inline
            {...rest}
            gap={1}
            as={as}
            aria-hidden="true"
            ref={forwardedRef}
        >
            {Children.map(children, (x: ReactElement) => {
                return cloneElement(x, {
                    size,
                    disabled
                });
            })}
        </Inline>
    );
}

export const IconList = slot("icon", forwardRef<InnerIconListProps>((props, ref) => (
    <InnerIconList {...props} forwardedRef={ref} />
)));

export type IconListProps = ComponentProps<typeof IconList>;
