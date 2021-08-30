import "./Heading.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitComponentProps, cssModule, mergeProps, normalizeSize, slot, useStyleProps } from "../../shared";

const DefaultElement = "div";

export interface InnerHeadingProps extends InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * A heading can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
}

export function InnerHeading(props: InnerHeadingProps) {
    const [styleProps] = useStyleProps("heading");

    const {
        size,
        as = DefaultElement,
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
                    as,
                    className: cssModule(
                        "o-ui-heading",
                        normalizeSize(size)
                    ),
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const Heading = slot("heading", forwardRef<any, OmitInternalProps<InnerHeadingProps>>((props, ref) => (
    <InnerHeading {...props} forwardedRef={ref} />
)));

export type HeadingProps = ComponentProps<typeof Heading>;

// Aliases

function createAlias(as: ElementType, size: InnerHeadingProps["size"]) {
    return slot("heading", forwardRef<any, OmitInternalProps<InnerHeadingProps, "size" | "as">>((props, ref) => (
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
