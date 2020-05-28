import { SIZE } from "../../shared";

const BUTTON_SIZE = {
    [SIZE.micro]: SIZE.micro,
    [SIZE.mini]: SIZE.micro,
    [SIZE.tiny]: SIZE.micro,
    [SIZE.small]: SIZE.mini,
    [SIZE.medium]: SIZE.tiny,
    [SIZE.large]: SIZE.small
};

export function getContentButtonSize(size) {
    return BUTTON_SIZE[size];
}
