import "./Lozenge.css";

import { Box } from "../../box/src/Box";
import { ComponentProps, ReactNode, forwardRef, useMemo } from "react";
import { InternalProps, OmitInternalProps, createSizeAdapter, cssModule, mergeProps, normalizeSize, slot, useMergedRefs, useSlots } from "../../shared";
import { Text } from "../../typography";
import { embeddedIconSize } from "../../icons";

const DefaultElement = "span";

export interface InnerLozengeProps extends InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * The badge color accent.
     */
    color?: "primary";
    /**
     * A lozenge can vary in size.
     */
    size?: "sm" | "md";
    /**
     * React children.
     */
    children: ReactNode;
}

const textSize = createSizeAdapter({
    "sm": "xs",
    "md": "sm"
});

export function InnerLozenge({
    color,
    size,
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerLozengeProps) {
    const ref = useMergedRefs(forwardedRef);

    const { icon, text } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: {
            size: embeddedIconSize(size),
            className: "o-ui-lozenge-icon"
        },
        text: {
            size: textSize(size),
            className: "o-ui-lozenge-text"
        }
    }), [size]));

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-lozenge",
                        color,
                        icon && "has-icon",
                        normalizeSize(size)
                    ),
                    as,
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
