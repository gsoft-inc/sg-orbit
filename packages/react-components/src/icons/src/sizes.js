import { BIG, HUGE, LARGE, MASSIVE, MEDIUM, MINI, SMALL, TINY } from "../../shared";

export const SIZES = [MINI, TINY, SMALL, MEDIUM, LARGE, BIG, HUGE, MASSIVE];
export const DEFAULT_SIZE = MEDIUM;

const CONTROLS_SIZES = {
    [MINI]: TINY,
    [TINY]: TINY,
    [SMALL]: TINY,
    [MEDIUM]: SMALL,
    [LARGE]: MEDIUM,
    [BIG]: LARGE,
    [HUGE]: BIG,
    [MASSIVE]: HUGE
};

export function getIconSizeForControl(controlSize = DEFAULT_SIZE) {
    return CONTROLS_SIZES[controlSize];
}
