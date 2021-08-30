import { Children, ReactElement, ReactNode, SVGProps } from "react";
import { augmentElement, createSizeAdapter } from "../../shared";

export interface EmbeddedIconProps extends SVGProps<SVGSVGElement>{
    /**
     * An icon can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "inherit";
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Allow any extra props
     */
    [key: string]: any;
}

export const embeddedIconSize = createSizeAdapter({
    "2xs": "2xs",
    "xs": "2xs",
    "sm": "xs",
    "md": "sm",
    "lg": "md",
    "xl": "lg",
    "inherit": "inherit"
});

export function EmbeddedIcon({ size, children, ...rest }: EmbeddedIconProps) {
    const icon = Children.only(children) as ReactElement;

    return augmentElement(icon, {
        size: embeddedIconSize(size),
        ...rest
    });
}
