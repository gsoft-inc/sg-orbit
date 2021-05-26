import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { forwardRef, mergeProps } from "../../shared";
import { useInputGroupAddonProps } from "./InputGroupContext";

export interface InnerIconAddonProps {
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

export function InnerIconAddon(props: InnerIconAddonProps) {
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
                    className: "o-ui-input-group-icon-addon",
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const IconAddon = forwardRef<InnerIconAddonProps>((props, ref) => (
    <InnerIconAddon {...props} forwardedRef={ref} />
));

export type IconAddonProps = ComponentProps<typeof IconAddon>;

IconAddon.displayName = "IconAddon";
