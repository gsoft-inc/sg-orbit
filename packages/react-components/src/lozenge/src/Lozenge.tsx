import "./Lozenge.css";

import { Box } from "../../box/src/Box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef, useMemo } from "react";
import { Text } from "../../typography";
import { createSizeAdapter, cssModule, mergeProps, normalizeSize, slot, useMergedRefs, useSlots } from "../../shared";
import { embeddedIconSize } from "../../icons";

const defaultElement = "span";

export interface InnerLozengeProps extends ComponentProps<typeof defaultElement>{
    /**
     * The badge color accent.
     */
    color?: "primary";
    /**
     * A lozenge can vary in size.
     */
    size?: "sm" | "md";
    /**
     * @ignore
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

const textSize = createSizeAdapter({
    "sm": "xs",
    "md": "sm"
});

export function InnerLozenge({
    color,
    size,
    as = defaultElement,
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

export const Lozenge = slot("lozenge", forwardRef<any, Omit<InnerLozengeProps, "forwardedRef">>((props, ref) => (
    <InnerLozenge {...props} forwardedRef={ref} />
)));

export type LozengeProps = ComponentProps<typeof Lozenge>;

Lozenge.displayName = "Lozenge";
