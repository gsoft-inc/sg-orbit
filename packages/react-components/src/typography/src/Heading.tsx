import "./Heading.css";

import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { DomProps, cssModule, mergeProps, normalizeSize, slot, useStyleProps } from "../../shared";

const defaultElement = "div";

export interface InnerHeadingProps extends DomProps, ComponentProps<typeof defaultElement>{
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
        as: As = defaultElement,
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

export const Heading = slot("heading", forwardRef<any, Omit<InnerHeadingProps, "forwardedRef">>((props, ref) => (
    <InnerHeading {...props} forwardedRef={ref} />
)));

export type HeadingProps = ComponentProps<typeof Heading>;

Heading.displayName = "Heading";

// Aliases

function createAlias(as: ElementType, size: InnerHeadingProps["size"]) {
    return slot("heading", forwardRef<any, Omit<InnerHeadingProps, "size" | "as" | "forwardedRef">>((props, ref) => (
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
