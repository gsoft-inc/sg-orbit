import { ComponentProps, ReactNode, forwardRef } from "react";
import { Box, omitProps, InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, useStyledSystem, cssModule, mergeProps } from "@orbit-ui/components";

const DefaultElement = "div";

export interface InnerPaperProps extends SlotProps, InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
    * @ignore
    */
    children?: ReactNode;
}

export function InnerPaper(props: InnerPaperProps) {
    const {
        as = DefaultElement,
        children,
        forwardedRef,
        ...rest
    } = omitProps(useStyledSystem(props), ["slot"]);


    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-paper"
                    ),
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

InnerPaper.defaultElement = DefaultElement;

export const Paper = forwardRef<any, OmitInternalProps<InnerPaperProps>>((props, ref) => (
    <InnerPaper {...props} forwardedRef={ref} />
));

export type PaperProps = ComponentProps<typeof Paper>;
