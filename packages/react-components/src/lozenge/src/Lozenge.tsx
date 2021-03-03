import "./Lozenge.css";

import { Box } from "../../box/src/Box";
import { ComponentProps, ElementType, ForwardedRef, ReactElement, useMemo } from "react";
import { Text } from "../../text";
import { createSizeAdapter, cssModule, forwardRef, mergeProps, normalizeSize, slot, useMergedRefs, useSlots } from "../../shared";
import { embeddedIconSize } from "../../icons";

export interface InnerLozengeProps {
    /**
     * The badge color accent.
     */
    color?: "primary";
    /**
     * A lozenge can vary in size.
     */
    size?: "sm" | "md";
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactElement<any, any>;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>
}

const textSize = createSizeAdapter({
    "sm": "xs",
    "md": "sm"
});

export function InnerLozenge({
    color,
    size,
    as = "span",
    children,
    forwardedRef,
    ...rest
}: InnerLozengeProps): ReactElement {
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

export const Lozenge = slot("lozenge", forwardRef<InnerLozengeProps>((props, ref) => (
    <InnerLozenge {...props} forwardedRef={ref} />
)));

export type LozengeProps = ComponentProps<typeof Lozenge>;

Lozenge.displayName = "Lozenge";
