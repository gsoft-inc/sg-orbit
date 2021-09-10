import { Children, ComponentProps, ReactElement, ReactNode, cloneElement, forwardRef } from "react";
import { IconSize } from "./Icon";
import { Inline } from "../../layout";
import { InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, slot } from "../../shared";

const DefaultElement = "span";

export interface InnerIconListProps extends SlotProps, InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the icons of the list should look disabled.
     */
    disabled?: boolean;
    /**
     * Size of the icons.
     */
    size?: IconSize;
}

export function InnerIconList({
    as = DefaultElement,
    children,
    disabled,
    forwardedRef,
    size,
    ...rest
}: InnerIconListProps) {
    return (
        <Inline
            {...rest}
            aria-hidden="true"
            as={as}
            gap={1}
            ref={forwardedRef}
        >
            {Children.toArray(children).filter(x => x).map((x: ReactElement) => {
                return cloneElement(x, {
                    disabled,
                    size
                });
            })}
        </Inline>
    );
}

export const IconList = slot("icon", forwardRef<any, OmitInternalProps<InnerIconListProps>>((props, ref) => (
    <InnerIconList {...props} forwardedRef={ref} />
)));

export type IconListProps = ComponentProps<typeof IconList>;
