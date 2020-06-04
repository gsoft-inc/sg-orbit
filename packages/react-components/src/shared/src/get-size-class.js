import { SIZE } from "./size";

const SIZE_CLASS = {
    [SIZE.micro]: "micro",
    [SIZE.mini]: "mini",
    [SIZE.tiny]: "tiny",
    [SIZE.small]: "small",
    [SIZE.large]: "large",
    [SIZE.big]: "big",
    [SIZE.huge]: "huge",
    [SIZE.massive]: "massive"
};

export function getSizeClass(size) {
    return SIZE_CLASS[size];
}
