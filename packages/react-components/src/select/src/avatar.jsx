import { LARGE, MEDIUM, SMALL } from "../../shared";
import { Image as SemanticImage } from "semantic-ui-react";
import { isElement } from "react-is";
import { isNil } from "lodash";

const SIZES_TO_AVATAR = {
    [SMALL]: "tiny",
    [MEDIUM]: "small",
    [LARGE]: "small"
};

export const renderAvatar = (avatar, size, additionalProps) => {
    const defaults = {
        avatar: true,
        size: !isNil(size) ? SIZES_TO_AVATAR[size] : undefined,
        ...additionalProps
    };

    if (!isNil(avatar)) {
        if (isElement(avatar)) {
            return (
                <SemanticImage {...defaults}>
                    {avatar}
                </SemanticImage>
            );
        }

        return SemanticImage.create({
            ...avatar,
            ...defaults
        });
    }
};
