import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, mergeProps } from "../../shared";
import { useInputGroupAddonProps } from "../../input-group";

const DefaultElement = "div";

export interface InnerTextAddonProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerTextAddon(props: InnerTextAddonProps) {
    const [inputGroupAddonProps] = useInputGroupAddonProps();

    const {
        as = DefaultElement,
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
                    as,
                    className: "o-ui-input-group-text-addon",
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const TextAddon = forwardRef<any, OmitInternalProps<InnerTextAddonProps>>((props, ref) => (
    <InnerTextAddon {...props} forwardedRef={ref} />
));

export type TextAddonProps = ComponentProps<typeof TextAddon>;
