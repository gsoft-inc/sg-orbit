import { ComponentProps, ElementType, ForwardedRef, ReactNode, useMemo } from "react";
import { Flex } from "../../layout";
import { forwardRef, isNil, mergeProps, slot } from "../../shared";

export interface InnerIllustrationProps {
    /**
     * The orientation of the illustration.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * The illustration background color, e.g "primary-200".
     */
    color?: string;
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

function useColor(color: string) {
    return useMemo(() => {
        if (!isNil(color)) {
            if (color.startsWith("rgb") || color.startsWith("hsl") || color.startsWith("#")) {
                return color;
            } else if (color.startsWith("--")) {
                return `var(${color})`;
            } else {
                const prefix = color.includes("primary") ? "alias" : "global";

                return `var(--o-ui-${prefix}-${color})`;
            }
        }
    }, [color]);
}

export function InnerIllustration({
    orientation = "horizontal",
    color,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerIllustrationProps) {
    const isHorizontal = orientation === "horizontal";

    return (
        <Flex
            {...mergeProps<any>(
                rest,
                {
                    direction: isHorizontal ? "column" : "row",
                    alignItems: "center",
                    justifyContent: "center",
                    style: {
                        backgroundColor: useColor(color),
                        width: isHorizontal ? "100%" : undefined,
                        height: isHorizontal ? undefined : "100%"
                    },
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Flex>
    );
}

export const Illustration = slot("illustration", forwardRef<InnerIllustrationProps>((props, ref) => (
    <InnerIllustration {...props} forwardedRef={ref} />
)));

export type IllustrationProps = ComponentProps<typeof Illustration>;

Illustration.displayName = "Illustration";
