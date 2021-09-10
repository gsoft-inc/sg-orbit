import { Children, ReactElement, ReactNode, SVGProps } from "react";
import { IconSize } from "./Icon";
import { InternalProps, SlotProps, StyledSystemProps, augmentElement, createSizeAdapter } from "../../shared";

export interface EmbeddedIconProps extends
    StyledSystemProps,
    SlotProps,
    InternalProps,
    Omit<SVGProps<SVGSVGElement>, keyof StyledSystemProps> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the icon should look disabled.
     */
    disabled?: boolean;
    /**
     * An icon can vary in size.
     */
    size?: IconSize;
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
