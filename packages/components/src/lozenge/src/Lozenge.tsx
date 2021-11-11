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

export interface InnerLozengeProps extends SlotProps, InternalProps, Omit<StyledComponentProps<typeof DefaultElement>, "color" | "backgroundColor"> {
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
    tone?: "informative" | "warning" | "positive" | "negative";
    /**
     * Whether or not to add emphasis to the lozenge.
     */
    variant?: "basic" | "highlight";
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
    tone,
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
                        tone,
                        icon && "has-icon",
                        variant,
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

InnerLozenge.defaultElement = DefaultElement;

export const Lozenge = slot("lozenge", forwardRef<any, OmitInternalProps<InnerLozengeProps>>((props, ref) => (
    <InnerLozenge {...props} forwardedRef={ref} />
)));

export type LozengeProps = ComponentProps<typeof Lozenge>;
