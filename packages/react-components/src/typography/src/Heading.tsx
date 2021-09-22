import "./Heading.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, JsxElement, OmitInternalProps, SlotProps, StyledComponentProps, cssModule, mergeProps, normalizeSize, slot, useStyleProps } from "../../shared";

export type AbstractHeadingProps<T extends JsxElement<T>> = SlotProps & InternalProps & StyledComponentProps<T> & {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * An heading can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
};

const DefaultElement = "div";

export type InnerHeadingProps = AbstractHeadingProps<typeof DefaultElement>;

export function InnerHeading(props: InnerHeadingProps) {
    const [styleProps] = useStyleProps<InnerHeadingProps>("heading");

    const {
        as = DefaultElement,
        children,
        forwardedRef,
        size,
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

/////////////

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
    return slot("heading", forwardRef<any, OmitInternalProps<AbstractHeadingProps<typeof as>>>((props, ref) => (
        <InnerHeading
            {...props}
            as={as}
            forwardedRef={ref}
        />
    )));
}

export const H1 = createHeading("h1");
export const H2 = createHeading("h2");
export const H3 = createHeading("h3");
export const H4 = createHeading("h4");
export const H5 = createHeading("h5");
export const H6 = createHeading("h6");
