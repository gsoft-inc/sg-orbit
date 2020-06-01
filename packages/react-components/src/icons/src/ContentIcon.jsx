import { SIZE } from "../../shared";
import { cloneElement } from "react";

const ADJUSTED_SIZE = {
    [SIZE.micro]: SIZE.micro,
    [SIZE.mini]: SIZE.mini,
    [SIZE.tiny]: SIZE.mini,
    [SIZE.small]: SIZE.tiny,
    [SIZE.medium]: SIZE.small,
    [SIZE.large]: SIZE.medium,
    [SIZE.big]: SIZE.large,
    [SIZE.huge]: SIZE.big,
    [SIZE.massive]: SIZE.huge
};

export function ContentIcon({ icon, size, ...rest }) {
    return cloneElement(icon, {
        size: ADJUSTED_SIZE[size || SIZE.medium],
        ...rest
    });
}
