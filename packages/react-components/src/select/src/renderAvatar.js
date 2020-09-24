import { Image as SemanticImage } from "semantic-ui-react";
import { getSize } from "../../shared";
import { isElement } from "react-is";

const AVATAR_SIZE = {
    "sm": "2xs",
    "md": "xs",
    "lg": "sm"
};

export function renderAvatar(avatar, size) {
    const props = {
        avatar: true,
        size: AVATAR_SIZE[getSize(size)]
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
