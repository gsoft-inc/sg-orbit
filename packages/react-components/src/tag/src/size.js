import { LARGE, MEDIUM, MICRO, MINI, SMALL, TINY } from "../../shared";

const TAG_SIZE = {
    [MICRO]: MICRO,
    [MINI]: MICRO,
    [TINY]: MICRO,
    [SMALL]: MINI,
    [MEDIUM]: MINI,
    [LARGE]: TINY
};

export function getTagSize(size) {
    return TAG_SIZE[size];
}
