import { Children, ReactElement, ReactNode } from "react";
import { augmentElement, createSizeAdapter } from "../../shared";

export interface EmbeddedIconProps {
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "inherit";
    children: ReactNode;
    [key: string]: any
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

export function EmbeddedIcon({ size, children, ...rest }: EmbeddedIconProps): ReactElement {
    const icon = Children.only(children) as ReactElement;

    return augmentElement(icon, {
        size: embeddedIconSize(size),
        ...rest
    });
}

EmbeddedIcon.displayName = "EmbeddedIcon";
