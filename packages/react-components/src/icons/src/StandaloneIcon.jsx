import { SIZE } from "../../shared";
import { cloneElement } from "react";

const ADJUSTED_SIZE = {
    [SIZE.micro]: SIZE.micro,
    [SIZE.mini]: SIZE.mini,
    [SIZE.tiny]: SIZE.tiny,
    [SIZE.small]: SIZE.small,
    [SIZE.medium]: SIZE.medium,
    [SIZE.large]: SIZE.large,
    [SIZE.big]: SIZE.big,
    [SIZE.huge]: SIZE.huge,
    [SIZE.massive]: SIZE.massive
};

export function StandaloneIcon({ icon, size, ...rest }) {
    return cloneElement(icon, {
        size: ADJUSTED_SIZE[size || SIZE.medium],
        ...rest
    });
}
