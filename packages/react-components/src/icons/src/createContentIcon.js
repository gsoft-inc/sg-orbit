import { SIZE } from "../../shared";
import { cloneElement } from "react";

const SIZE_WHEN_IN_CONTENT = {
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

export function createContentIcon(icon, size, props = {}) {
    return cloneElement(icon, {
        size: SIZE_WHEN_IN_CONTENT[size || SIZE.medium],
        ...props
    });
}
