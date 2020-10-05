import { Children, cloneElement } from "react";
import { any, string } from "prop-types";
import { createSizeAdapterSlotFactory, getSize } from "../../shared";

const SIZE = {
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

    return cloneElement(icon, {
        size: SIZE[getSize(size)],
        ...rest
    });
}

EmbeddedIcon.propTypes = propTypes;

export const embeddedIconSlot = createSizeAdapterSlotFactory(SIZE);
