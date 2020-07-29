import { Children, cloneElement } from "react";
import { SIZE, createSizeAdapterSlotFactory, registerSlotFactory } from "../../shared";
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

function getEmbedSize(size) {
    return EMBED_SIZE[size || SIZE.medium];
}

/******/

const propTypes = {
    size: string,
    standalone: bool,
    children: any.isRequired
};

export function EmbeddedIcon({ size, children, ...rest }) {
    const icon = Children.only(children);

    return cloneElement(icon, {
        size: getEmbedSize(size),
        ...rest
    });
}

EmbeddedIcon.propTypes = propTypes;

/******/

registerSlotFactory("icon", createSizeAdapterSlotFactory(EMBED_SIZE));
