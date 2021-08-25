import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { forwardRef, mergeProps } from "../../shared";
import { useInputGroupAddonProps } from "../../input-group";

export interface InnerTextAddonProps {
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

export function InnerTextAddon(props: InnerTextAddonProps) {
    const [inputGroupAddonProps] = useInputGroupAddonProps();

    const {
        as,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        inputGroupAddonProps
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: "o-ui-input-group-text-addon",
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const TextAddon = forwardRef<InnerTextAddonProps>((props, ref) => (
    <InnerTextAddon {...props} forwardedRef={ref} />
));

export type TextAddonProps = ComponentProps<typeof TextAddon>;
