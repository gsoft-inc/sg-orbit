import { Children, cloneElement } from "react";
import { SIZE, createSizeAdapterSlotFactory } from "../../shared";
import { any, string } from "prop-types";

const EMBED_SIZE = {
    "2xs": "2xs",
    "xs": "2xs",
    "sm": "xs",
    "md": "sm",
    "lg": "md",
    "inherit": "inherit"
};

const propTypes = {
    size: string,
    children: any.isRequired
};

export function EmbeddedIcon({ size, children, ...rest }) {
    const icon = Children.only(children);

    return cloneElement(icon, {
        size: EMBED_SIZE[size || SIZE.md],
        ...rest
    });
}

EmbeddedIcon.propTypes = propTypes;

export const iconSlot = createSizeAdapterSlotFactory(EMBED_SIZE);
