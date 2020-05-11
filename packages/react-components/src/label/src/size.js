import { LARGE, MEDIUM, MICRO, MINI, SMALL, TINY } from "../../shared";

const LABEL_SIZE = {
    [MICRO]: MICRO,
    [MINI]: MICRO,
    [TINY]: MICRO,
    [SMALL]: MINI,
    [MEDIUM]: MINI,
    [LARGE]: TINY
};

export function getContentLabelSize(size) {
    return LABEL_SIZE[size];
}
