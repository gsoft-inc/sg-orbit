import { ComponentProps, ElementType, ForwardedRef } from "react";
import { forwardRef } from "../../shared";

export interface InternalProps {
    /**
     * @ignore
     */
    as?: ElementType;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

//////////////

const DefaultElement = "div";

export interface InnerFlex2Props extends InternalProps, ComponentProps<typeof DefaultElement> {
}

export function InnerFlex2({
}: InnerFlex2Props) {
    return (

    );
}

export const Flex2 = forwardRef<InnerFlex2Props>((props, ref) => (
    <InnerFlex2 {...props} forwardedRef={ref} />
));

export type Flex2Props = ComponentProps<typeof Flex2>;
