import { Children } from "react";
import { any, string } from "prop-types";
import { augmentElement, createSizeAdapterSlotFactory, getSize } from "../../shared";

export const EMBEDDED_ICON_SIZE = {
    "2xs": "2xs",
    "xs": "2xs",
    "sm": "xs",
    "md": "sm",
    "lg": "md",
    "xl": "lg",
    "inherit": "inherit"
};

const propTypes = {
    size: string,
    children: any.isRequired
};

export function EmbeddedIcon({ size, children, ...rest }) {
    const icon = Children.only(children);

    return augmentElement(icon, {
        size: EMBEDDED_ICON_SIZE[getSize(size)],
        ...rest
    });
}

EmbeddedIcon.propTypes = propTypes;

export const embeddedIconSlot = createSizeAdapterSlotFactory(EMBEDDED_ICON_SIZE);
