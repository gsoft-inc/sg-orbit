import { BIG, HUGE, LARGE, MASSIVE, MEDIUM, MICRO, MINI, SMALL, TINY } from "../../shared";

export const SIZES = [MINI, TINY, SMALL, MEDIUM, LARGE, BIG, HUGE, MASSIVE];
export const DEFAULT_SIZE = MEDIUM;

const CONTROLS_SIZES = {
    [MICRO]: MICRO,
    [MINI]: TINY,
    [TINY]: TINY,
    [SMALL]: TINY,
    [MEDIUM]: SMALL,
    [LARGE]: MEDIUM,
    [BIG]: LARGE,
    [HUGE]: BIG,
    [MASSIVE]: HUGE
};

const CONTROLS_SIZES_COMPACT = {
    [MICRO]: MICRO,
    [MINI]: TINY,
    [TINY]: TINY,
    [SMALL]: SMALL,
    [MEDIUM]: MEDIUM,
    [LARGE]: LARGE,
    [BIG]: BIG,
    [HUGE]: HUGE,
    [MASSIVE]: MASSIVE
};

export function getIconSizeForControl(controlSize = DEFAULT_SIZE) {
    return CONTROLS_SIZES[controlSize];
}

export function getIconSizeForCompactControl(controlSize = DEFAULT_SIZE) {
    return CONTROLS_SIZES_COMPACT[controlSize];
}
