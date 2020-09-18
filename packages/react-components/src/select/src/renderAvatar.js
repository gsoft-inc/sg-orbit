import { SIZE } from "../../shared";
import { Image as SemanticImage } from "semantic-ui-react";
import { isElement } from "react-is";

const AVATAR_SIZE = {
    [SIZE.sm]: SIZE._2xs,
    [SIZE.md]: SIZE.xs,
    [SIZE.lg]: SIZE.sm
};

export function renderAvatar(avatar, size) {
    const props = {
        avatar: true,
        size: AVATAR_SIZE[size || SIZE.md]
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
