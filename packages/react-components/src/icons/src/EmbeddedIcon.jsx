import { Children } from "react";
import { any, string } from "prop-types";
import { augmentElement, createSizeAdapter } from "../../shared";

const propTypes = {
    size: string,
    children: any.isRequired
};

export const embeddedIconSize = createSizeAdapter({
    "2xs": "2xs",
    "xs": "2xs",
    "sm": "xs",
    "md": "sm",
    "lg": "md",
    "xl": "lg",
    "inherit": "inherit"
});

export function EmbeddedIcon({ size, children, ...rest }) {
    const icon = Children.only(children);

    return augmentElement(icon, {
        size: embeddedIconSize(size),
        ...rest
    });
}

EmbeddedIcon.propTypes = propTypes;
EmbeddedIcon.displayName = "EmbeddedIcon";
