import { SIZE, SemanticRef, createShorthandFactory, createShorthandFactoryForEmbedded, mergeClasses, throwWhenUnsupportedPropIsProvided } from "../../shared";
import { Label as SemanticLabel } from "semantic-ui-react";
import { forwardRef } from "react";
import { oneOf } from "prop-types";

const UNSUPPORTED_PROPS = ["attached", "color", "circular", "corner", "floating", "horizontal", "image", "onClick", "onRemove", "pointing", "prompt", "removeIcon", "ribbon", "tag"];

const propTypes = {
    /**
     * A tag can vary in sizes.
     */
    size: oneOf(["micro", "mini", "tiny", "small", "medium", "large", "big", "huge", "massive"])
};

export function InnerTag({ forwardedRef, className, disabled, ...props }) {
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/Tag");

    return (
        <SemanticRef innerRef={forwardedRef}>
            <SemanticLabel
                {...props}
                tag
                circular
                empty
                className={mergeClasses(
                    disabled && "disabled",
                    className
                )}
            />
        </SemanticRef>
    );
}

InnerTag.propTypes = propTypes;

export const Tag = forwardRef((props, ref) => (
    <InnerTag { ...props } forwardedRef={ref} />
));

export const createTag = createShorthandFactory(Tag);

export const createEmbeddedTag = createShorthandFactoryForEmbedded(createTag, {
    [SIZE.micro]: SIZE.micro,
    [SIZE.mini]: SIZE.micro,
    [SIZE.tiny]: SIZE.micro,
    [SIZE.small]: SIZE.mini,
    [SIZE.medium]: SIZE.mini,
    [SIZE.large]: SIZE.tiny
});

