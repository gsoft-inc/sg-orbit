import { Children, ReactElement, ReactNode, SVGProps } from "react";
import { augmentElement, createSizeAdapter } from "../../shared";

export interface EmbeddedIconProps extends SVGProps<SVGSVGElement> {
    /**
     * Allow any extra props
     */
    [key: string]: any;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * An icon can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "inherit";
}

/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
export const embeddedIconSize = createSizeAdapter({
    "2xs": "2xs",
    "xs": "2xs",
    "sm": "xs",
    "md": "sm",
    "lg": "md",
    "xl": "lg",
    "inherit": "inherit"
});
/* eslint-enable sort-keys, sort-keys-fix/sort-keys-fix */

export function EmbeddedIcon({ children, size, ...rest }: EmbeddedIconProps) {
    const icon = Children.only(children) as ReactElement;

    return augmentElement(icon, {
        size: embeddedIconSize(size),
        ...rest
    });
}
