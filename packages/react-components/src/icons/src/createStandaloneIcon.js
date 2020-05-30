import { SIZE } from "../../shared";
import { cloneElement } from "react";

const SIZE_WHEN_STANDALONE = {
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

export function createStandaloneIcon(icon, size, props = {}) {
    return cloneElement(icon, {
        size: SIZE_WHEN_STANDALONE[size],
        ...props
    });
}
