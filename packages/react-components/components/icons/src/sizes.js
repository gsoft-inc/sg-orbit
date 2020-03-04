import { BIG, HUGE, LARGE, MASSIVE, MEDIUM, SMALL, TINY } from "@orbit-ui/react-components-shared";

export const SIZES = [TINY, SMALL, MEDIUM, LARGE, BIG, HUGE, MASSIVE];
export const DEFAULT_SIZE = MEDIUM;

const CONTROLS_SIZES = {
    [TINY]: SMALL,
    [SMALL]: SMALL,
    [MEDIUM]: SMALL,
    [LARGE]: MEDIUM,
    [BIG]: LARGE,
    [HUGE]: BIG,
    [MASSIVE]: HUGE
};

export function getIconSizeForControl(controlSize = DEFAULT_SIZE) {
    return CONTROLS_SIZES[controlSize];
}
