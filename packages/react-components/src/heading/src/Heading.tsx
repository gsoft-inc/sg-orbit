import "./Heading.css";

import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { cssModule, forwardRef, mergeProps, normalizeSize, slot, useStyleProps } from "../../shared";

interface InnerHeadingProps {
    /**
     * A heading can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
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
    forwardedRef: ForwardedRef<any>
}

export function InnerHeading(props: InnerHeadingProps) {
    const [styleProps] = useStyleProps("heading");

    const {
        size,
        as: As = "div",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    return (
        <As
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-heading",
                        normalizeSize(size)
                    ),
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </As>
    );
}

export const Heading = slot("heading", forwardRef<InnerHeadingProps>((props, ref) => (
    <InnerHeading {...props} forwardedRef={ref} />
)));

export type HeadingProps = ComponentProps<typeof Heading>

Heading.displayName = "Heading";
