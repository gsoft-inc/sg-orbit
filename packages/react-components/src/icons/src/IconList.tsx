import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, cloneElement, forwardRef } from "react";
import { Inline } from "../../layout";
import { slot } from "../../shared";

const DefaultElement = "span";

export interface InnerIconListProps extends ComponentProps<typeof DefaultElement>{
    /**
     * Whether or not the IconList is disabled.
     */
    disabled?: boolean;
    /**
     * Size of the icons.
     */
    size?: string;
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

export function InnerIconList({
    size,
    disabled,
    children,
    as = DefaultElement,
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
            {Children.toArray(children).filter(x => x).map((x: ReactElement) => {
                return cloneElement(x, {
                    size,
                    disabled
                });
            })}
        </Inline>
    );
}

export const IconList = slot("icon", forwardRef<any, Omit<InnerIconListProps, "forwardedRef">>((props, ref) => (
    <InnerIconList {...props} forwardedRef={ref} />
)));

export type IconListProps = ComponentProps<typeof IconList>;
