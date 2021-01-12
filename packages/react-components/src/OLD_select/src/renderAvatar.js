import { Image as SemanticImage } from "semantic-ui-react";
import { isElement } from "react-is";
import { normalizeSize } from "../../shared";

const AVATAR_SIZE = {
    "sm": "2xs",
    "md": "xs",
    "lg": "sm"
};

export function renderAvatar(avatar, size) {
    const props = {
        avatar: true,
        size: AVATAR_SIZE[normalizeSize(size)]
    };

    if (isElement(avatar)) {
        return (
            <SemanticImage {...props}>
                {avatar}
            </SemanticImage>
        );
    }

    return SemanticImage.create({
        ...avatar,
        ...props
    });
}
