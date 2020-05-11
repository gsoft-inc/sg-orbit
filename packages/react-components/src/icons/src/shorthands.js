import { BIG, HUGE, LARGE, MASSIVE, MEDIUM, MICRO, MINI, SMALL, TINY } from "../../shared";
import { cloneElement } from "react";

export const DEFAULT_SIZE = {
    [MICRO]: MINI,
    [MINI]: MINI,
    [TINY]: MINI,
    [SMALL]: TINY,
    [MEDIUM]: SMALL,
    [LARGE]: MEDIUM,
    [BIG]: LARGE,
    [HUGE]: BIG,
    [MASSIVE]: HUGE
};

export const STANDALONE_SIZE = {
    [MICRO]: MICRO,
    [MINI]: MINI,
    [TINY]: TINY,
    [SMALL]: SMALL,
    [MEDIUM]: MEDIUM,
    [LARGE]: LARGE,
    [BIG]: BIG,
    [HUGE]: HUGE,
    [MASSIVE]: MASSIVE
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
