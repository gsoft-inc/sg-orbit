import "./Text.css";

import {Box} from "../../box";
import {ElementType, ForwardedRef, forwardRef, ReactElement, ReactNode} from "react";
import {mergeClasses, mergeProps, normalizeSize, PropsWithoutForwardedRef, Size, useStyleProps} from "../../shared";

export function getTextClass(size: Size) {
    return `o-ui-text-${normalizeSize(size)}`;
}

interface TextProps {
    /**
     * A text can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "inherit";
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * Default slot override.
     */
    slot?: string;
    /**
     * React children
     */
    children?: ReactNode;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>
}

export function InnerText(props: TextProps): ReactElement {
    const [styleProps] = useStyleProps("text");

    const {
        size,
        as = "span",
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
                    className: mergeClasses(getTextClass(size), "o-ui-text"),
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const Text = forwardRef<any, PropsWithoutForwardedRef<TextProps>>((props, ref) => (
    <InnerText {...props} forwardedRef={ref} />
));


Text.displayName = "Text";
