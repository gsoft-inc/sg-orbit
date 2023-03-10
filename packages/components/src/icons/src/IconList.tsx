import { Children, ComponentProps, ReactElement, ReactNode, cloneElement, forwardRef } from "react";
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
}

export function InnerIconList({
    as = DefaultElement,
    children,
    disabled,
    forwardedRef,
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
                    disabled
                });
            })}
        </Inline>
    );
}

InnerIconList.defaultElement = DefaultElement;

/**
 * [Documentation](https://orbit.sharegate.design/?path=/docs/icon--default-story)
*/
export const IconList = slot("icon", forwardRef<any, OmitInternalProps<InnerIconListProps>>((props, ref) => (
    <InnerIconList {...props} forwardedRef={ref} />
)));

export type IconListProps = ComponentProps<typeof IconList>;
