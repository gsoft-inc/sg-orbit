import { SIZE, createShorthandFactory } from "../../shared";
import { cloneElement } from "react";

const SIZE_WHEN_EMBED = {
    [SIZE.micro]: SIZE.micro,
    [SIZE.mini]: SIZE.micro,
    [SIZE.tiny]: SIZE.micro,
    [SIZE.small]: SIZE.mini,
    [SIZE.medium]: SIZE.tiny,
    [SIZE.large]: SIZE.small
};

export function EmbeddedButton({ button, size, ...rest }) {
    return cloneElement(button, {
        size: SIZE_WHEN_EMBED[size || SIZE.medium],
        ...rest
    });
}

export const createEmbeddedButton = createShorthandFactory(EmbeddedButton);

