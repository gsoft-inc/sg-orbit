import { Children, cloneElement } from "react";
import { SIZE, createSizeAdapterSlotFactory } from "../../shared";
import { any, string } from "prop-types";

const EMBED_SIZE = {
    [SIZE._3xs]: SIZE._3xs,
    [SIZE._2xs]: SIZE._2xs,
    [SIZE.xs]: SIZE._2xs,
    [SIZE.sm]: SIZE.xs,
    [SIZE.md]: SIZE.sm,
    [SIZE.lg]: SIZE.md,
    [SIZE.xl]: SIZE.lg,
    [SIZE._2xl]: SIZE.xl,
    [SIZE._3xl]: SIZE._2xl,
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
