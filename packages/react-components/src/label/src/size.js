import { SIZE } from "../../shared";

const LABEL_SIZE = {
    [SIZE.micro]: SIZE.micro,
    [SIZE.mini]: SIZE.micro,
    [SIZE.tiny]: SIZE.micro,
    [SIZE.small]: SIZE.mini,
    [SIZE.medium]: SIZE.mini,
    [SIZE.large]: SIZE.tiny
};

// TODO: Delete once everything merged
export function getContentLabelSize(size) {
    return LABEL_SIZE[size];
}
