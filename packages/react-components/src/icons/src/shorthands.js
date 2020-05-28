import { SIZE } from "../../shared";
import { cloneElement } from "react";

export const DEFAULT_SIZE = {
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

export const STANDALONE_SIZE = {
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

export function createContentIcon(icon, size, props = {}) {
    return cloneElement(icon, {
        size: DEFAULT_SIZE[size],
        ...props
    });
}

export function createStandaloneIcon(icon, size, props = {}) {
    return cloneElement(icon, {
        size: STANDALONE_SIZE[size],
        ...props
    });
}
