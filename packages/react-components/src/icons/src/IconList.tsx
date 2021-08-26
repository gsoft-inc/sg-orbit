import { Children, ComponentProps, ReactElement, ReactNode, cloneElement, forwardRef } from "react";
import { Inline } from "../../layout";
import { InternalProps, OmitInternalProps, slot } from "../../shared";

const DefaultElement = "span";

export interface InnerIconListProps extends InternalProps, ComponentProps<typeof DefaultElement>{
    /**
     * Whether or not the IconList is disabled.
     */
    disabled?: boolean;
    /**
     * Size of the icons.
     */
    size?: string;
    /**
     * React children.
     */
    children: ReactNode;
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

export const IconList = slot("icon", forwardRef<any, OmitInternalProps<InnerIconListProps>>((props, ref) => (
    <InnerIconList {...props} forwardedRef={ref} />
)));

export type IconListProps = ComponentProps<typeof IconList>;
