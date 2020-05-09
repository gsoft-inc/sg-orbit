import { LARGE, MEDIUM, MINI, SMALL, TINY } from "../../shared";
import { Image as SemanticImage } from "semantic-ui-react";
import { isElement } from "react-is";
import { isNil } from "lodash";

const AVATAR_SIZE = {
    [SMALL]: MINI,
    [MEDIUM]: TINY,
    [LARGE]: SMALL
};

export function renderAvatar(avatar, size, additionalProps) {
    const props = {
        avatar: true,
        size: AVATAR_SIZE[size],
        ...additionalProps
    };

    if (!isNil(avatar)) {
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
}
