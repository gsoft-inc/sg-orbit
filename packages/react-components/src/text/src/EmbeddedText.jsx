import { EMBED_SIZE, Text } from "./Text";
import { SIZE } from "../../shared";
import { any, string } from "prop-types";

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
