import { Children, cloneElement } from "react";
import { SIZE, createSizeAdapterSlotFactory } from "../../shared";
import { any, bool, string } from "prop-types";

const EMBED_SIZE = {
    [SIZE.micro]: SIZE.micro,
    [SIZE.mini]: SIZE.mini,
    [SIZE.tiny]: SIZE.mini,
    [SIZE.small]: SIZE.tiny,
    [SIZE.medium]: SIZE.small,
    [SIZE.large]: SIZE.medium,
    [SIZE.big]: SIZE.large,
    [SIZE.huge]: SIZE.big,
    [SIZE.massive]: SIZE.huge
};

const propTypes = {
    size: string,
    standalone: bool,
    children: any.isRequired
};

export function EmbeddedIcon({ size, children, ...rest }) {
    const icon = Children.only(children);

    return cloneElement(icon, {
        size: EMBED_SIZE[size || SIZE.medium],
        ...rest
    });
}

EmbeddedIcon.propTypes = propTypes;

export const iconSlot = createSizeAdapterSlotFactory(EMBED_SIZE);
