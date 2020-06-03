import { SIZE } from "./size";

const SIZE_CLASS = {
    [SIZE.small]: "small",
    [SIZE.large]: "large"
};

export function getSizeClass(size) {
    return SIZE_CLASS[size];
}
