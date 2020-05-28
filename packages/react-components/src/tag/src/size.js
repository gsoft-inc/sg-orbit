import { SIZE } from "../../shared";

const TAG_SIZE = {
    [SIZE.micro]: SIZE.micro,
    [SIZE.mini]: SIZE.micro,
    [SIZE.tiny]: SIZE.micro,
    [SIZE.small]: SIZE.mini,
    [SIZE.medium]: SIZE.mini,
    [SIZE.large]: SIZE.tiny
};

export function getTagSize(size) {
    return TAG_SIZE[size];
}
