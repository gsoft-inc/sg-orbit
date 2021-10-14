import "./Lozenge.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef, useMemo } from "react";
import {
    InternalProps,
    OmitInternalProps,
    SlotProps,
    StyledComponentProps,
    createSizeAdapter,
    cssModule,
    mergeProps,
    normalizeSize,
    slot,
    useMergedRefs,
    useSlots
} from "../../shared";
import { ResponsiveProp, useResponsiveValue } from "../../styling";
import { Text } from "../../typography";
import { embeddedIconSize } from "../../icons";

const DefaultElement = "span";

export interface InnerLozengeProps extends SlotProps, InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * A lozenge can vary in size.
     */
    size?: ResponsiveProp<"sm" | "md">;
    /**
     * The lozenze style to use.
     */
    variant?: "primary";
}

/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
const textSize = createSizeAdapter({
    "sm": "xs",
    "md": "sm"
});
/* eslint-enable sort-keys, sort-keys-fix/sort-keys-fix */

export function InnerLozenge({
    as = DefaultElement,
    children,
    variant,
    forwardedRef,
    size,
    ...rest
}: InnerLozengeProps) {
    const sizeValue = useResponsiveValue(size);

    const ref = useMergedRefs(forwardedRef);

    const { icon, text } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: {
            className: "o-ui-lozenge-icon",
            size: embeddedIconSize(sizeValue)
        },
        text: {
            className: "o-ui-lozenge-text",
            size: textSize(sizeValue)
        }
    }), [sizeValue]));

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-lozenge",
                        variant,
                        icon && "has-icon",
                        normalizeSize(sizeValue)
                    ),
                    ref
                }
            )}
        >
            {icon}
            {text}
        </Box>
    );
}

export const Lozenge = slot("lozenge", forwardRef<any, OmitInternalProps<InnerLozengeProps>>((props, ref) => (
    <InnerLozenge {...props} forwardedRef={ref} />
)));

export type LozengeProps = ComponentProps<typeof Lozenge>;
