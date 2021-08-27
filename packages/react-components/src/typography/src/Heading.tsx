import "./Heading.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { cssModule, forwardRef, mergeProps, normalizeSize, slot, useStyleProps } from "../../shared";

export interface InnerHeadingProps {
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
    forwardedRef: ForwardedRef<any>;
}

export function InnerHeading(props: InnerHeadingProps) {
    const [styleProps] = useStyleProps("heading");

    const {
        size,
        as = "div",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-heading",
                        normalizeSize(size)
                    ),
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const Heading = slot("heading", forwardRef<InnerHeadingProps>((props, ref) => (
    <InnerHeading {...props} forwardedRef={ref} />
)));

export type HeadingProps = ComponentProps<typeof Heading>;

// Aliases

function createAlias(as: ElementType, size: InnerHeadingProps["size"]) {
    return slot("heading", forwardRef<Omit<InnerHeadingProps, "size" | "as">, typeof as>((props, ref) => (
        <InnerHeading
            {...props}
            size={size}
            as={as}
            forwardedRef={ref}
        />
    )));
}

export const H1 = createAlias("h1", "xl");
export const H2 = createAlias("h2", "lg");
export const H3 = createAlias("h3", "md");
export const H4 = createAlias("h4", "sm");
export const H5 = createAlias("h5", "xs");
export const H6 = createAlias("h6", "2xs");
