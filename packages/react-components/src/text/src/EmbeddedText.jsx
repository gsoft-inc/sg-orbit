import { SIZE } from "../../shared";
import { Text } from "./Text";
import { any, string } from "prop-types";

const EMBED_SIZE = {
    [SIZE.small]: SIZE.tiny,
    [SIZE.medium]: SIZE.small,
    [SIZE.large]: SIZE.medium
};

const propTypes = {
    size: string,
    children: any.isRequired
};

export function EmbeddedText({ size, children, ...rest }) {
    return (
        <Text
            {...rest}
            size={EMBED_SIZE[size || SIZE.medium]}
        >
            {children}
        </Text>
    );
}

EmbeddedText.propTypes = propTypes;
