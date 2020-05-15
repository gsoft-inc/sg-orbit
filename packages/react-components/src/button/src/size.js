import { LARGE, MEDIUM, MICRO, MINI, SMALL, TINY } from "../../shared";

const BUTTON_SIZE = {
    [MICRO]: MICRO,
    [MINI]: MICRO,
    [TINY]: MICRO,
    [SMALL]: MINI,
    [MEDIUM]: TINY,
    [LARGE]: SMALL
};

export function getContentButtonSize(size) {
    return BUTTON_SIZE[size];
}
