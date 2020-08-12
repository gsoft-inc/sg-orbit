export const SIZE = {
    micro: "micro",
    mini: "mini",
    tiny: "tiny",
    small: "small",
    medium: "medium",
    large: "large",
    big: "big",
    huge: "huge",
    massive: "massive"
};

export const SIZE_CLASS = {
    [SIZE.micro]: "micro",
    [SIZE.mini]: "mini",
    [SIZE.tiny]: "tiny",
    [SIZE.small]: "small",
    [SIZE.medium]: "medium",
    [SIZE.large]: "large",
    [SIZE.big]: "big",
    [SIZE.huge]: "huge",
    [SIZE.massive]: "massive"
};

export function getSizeClass(size) {
    return SIZE_CLASS[size || SIZE.medium];
}
