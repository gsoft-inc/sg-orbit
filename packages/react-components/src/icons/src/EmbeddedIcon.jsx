import { Children, cloneElement } from "react";
import { SIZE } from "../../shared";
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

const STANDALONE_SIZE = {
    [SIZE.micro]: SIZE.micro,
    [SIZE.mini]: SIZE.mini,
    [SIZE.tiny]: SIZE.tiny,
    [SIZE.small]: SIZE.small,
    [SIZE.medium]: SIZE.medium,
    [SIZE.large]: SIZE.large,
    [SIZE.big]: SIZE.big,
    [SIZE.huge]: SIZE.huge,
    [SIZE.massive]: SIZE.massive
};

const propTypes = {
    size: string,
    standalone: bool,
    children: any.isRequired
};

export function EmbeddedIcon({ size, standalone, children, ...rest }) {
    const icon = Children.only(children);

    const sizeChart = standalone ? STANDALONE_SIZE : EMBED_SIZE;

    return cloneElement(icon, {
        size: sizeChart[size || SIZE.medium],
        ...rest
    });
}

EmbeddedIcon.propTypes = propTypes;
