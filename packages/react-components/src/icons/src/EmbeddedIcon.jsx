import { SIZE } from "../../shared";
import { cloneElement } from "react";

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

const WHEN_STANDALONE_SIZE = {
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

export function EmbeddedIcon({ icon, size, standalone, ...rest }) {
    const sizeChart = standalone ? WHEN_STANDALONE_SIZE : EMBED_SIZE;

    return cloneElement(icon, {
        size: sizeChart[size || SIZE.medium],
        ...rest
    });
}
