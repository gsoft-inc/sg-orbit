/* eslint-disable react/forbid-foreign-prop-types */

import { Children, forwardRef } from "react";
import { EmbeddedIcon } from "../../icons";
import { SIZE, SemanticRef, createShorthandFactory, createShorthandFactoryForEmbedded, mergeClasses, throwWhenUnsupportedPropIsProvided } from "../../shared";
import { Label as SemanticLabel } from "semantic-ui-react";
import { bool, element, object, oneOf, oneOfType } from "prop-types";
import { createEmbeddedButton } from "../../button";
import { createEmbeddedTag } from "../../tag";
import { isNil, isString } from "lodash";

const SIZES = ["micro", "mini","tiny","small","medium","large","big","huge","massive"];
const UNSUPPORTED_PROPS = ["attached", "color", "corner", "empty", "floating", "horizontal", "image", "onRemove", "pointing", "prompt", "removeIcon", "ribbon"];

const propTypes = {
    /**
     * A label can be colorless. Use this variant if you need to customize the label.
     */
    naked: bool,
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) to display a [button](/?path=/docs/components-button--default-story) after the text.
     */
    button: oneOfType([element, object]),
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) to display an [icon](/?path=/docs/components-icon--default-story) before the text.
     */
    icon: element,
    /**
     * An icon can appear on the left or right.
     */
    iconPosition: oneOf(["left", "right"]),
    /**
     * A label can be compact.
     */
    compact: bool,
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) to display a [tag](/?path=/docs/components-tag--default-story) before the text.
     */
    tag: oneOfType([element, object]),
    /**
     * Whether to add emphasis on the label text or not.
     */
    highlight: bool,
    /**
     * A label can vary in sizes.
     */
    size: oneOf(SIZES)
};

const defaultProps = {
    iconPosition: "left"
};

function throwWhenMutuallyExclusivePropsAreProvided({ button, compact, circular, tag, icon, iconPosition }) {
    if (!isNil(button) && !isNil(icon) && iconPosition === "right") {
        throw new Error("@orbit-ui/react-components/Label doesn't support having a button and a right positioned icon at the same time.");
    }

    if (!isNil(tag) && !isNil(icon) && iconPosition === "left") {
        throw new Error("@orbit-ui/react-components/Label doesn't support having a tag and a left positioned icon at the same time.");
    }

    if (compact && circular) {
        throw new Error("@orbit-ui/react-components/Label doesn't support being circular and compact at the same time.");
    }
}

function throwWhenUnsupportedSizeIsProvided({ circular, size }) {
    if (circular) {
        if (size === SIZE.mini) {
            throw new Error(`@orbit-ui/react-components/Label doesn't support "${SIZE.mini}" size when "circular".`);
        }
    } else {
        if (size === SIZE.big || size === SIZE.huge || size === SIZE.massive) {
            throw new Error(`@orbit-ui/react-components/Label doesn't support "${SIZE.big}", "${SIZE.huge}" or "${SIZE.massive}" sizes.`);
        }
    }
}

export function InnerLabel(props) {
    const { naked, button, compact, icon, iconPosition, tag, highlight, disabled, size, className, children, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/Label");
    throwWhenMutuallyExclusivePropsAreProvided(props);
    throwWhenUnsupportedSizeIsProvided(props);

    const hasText = Children.count(children) > 0;

    const iconMarkup = !isNil(icon) && (
        <EmbeddedIcon icon={icon} size={size} standalone={!hasText} />
    );

    const buttonMarkup = !isNil(button) && createEmbeddedButton(button, {
        size,
        circular: true,
        ghost: true,
        secondary: true
    });

    const tagMarkup = !isNil(tag) && createEmbeddedTag(tag, {
        as: "span",
        size
    });

    const content = (
        <>
            {iconPosition === "left" && iconMarkup}{tagMarkup}
            {children}
            {iconPosition === "right" && iconMarkup}{buttonMarkup}
        </>
    );

    return (
        <SemanticRef innerRef={forwardedRef}>
            <SemanticLabel
                {...rest}
                size={size}
                className={mergeClasses(
                    naked && "naked",
                    highlight && "highlight",
                    disabled && "disabled",
                    !isNil(compact) && "compact",
                    !isNil(button) && "with-button",
                    !isNil(icon) && "with-icon",
                    !isNil(icon) && iconPosition === "right" && "with-icon-right",
                    !isNil(tag) && "with-tag",
                    !hasText && "without-text",
                    className
                )}
            >
                {content}
            </SemanticLabel>
        </SemanticRef>
    );
}

InnerLabel.propTypes = propTypes;
InnerLabel.defaultProps = defaultProps;

export const Label = forwardRef((props, ref) => (
    <InnerLabel { ...props } forwardedRef={ref} />
));

[InnerLabel, Label].forEach(x => {
    x.Detail = SemanticLabel.Detail;
    x.Group = SemanticLabel.Group;
});

if (!isNil(SemanticLabel.propTypes)) {
    SemanticLabel.propTypes.size = oneOf(SIZES);
}

export const createLabel = createShorthandFactory(Label, (shorthand, props) => {
    if (isString(shorthand)) {
        return (
            <Label {...props}>
                {shorthand}
            </Label>
        );
    }
});

export const createEmbeddedLabel = createShorthandFactoryForEmbedded(createLabel, {
    [SIZE.micro]: SIZE.micro,
    [SIZE.mini]: SIZE.micro,
    [SIZE.tiny]: SIZE.micro,
    [SIZE.small]: SIZE.mini,
    [SIZE.medium]: SIZE.mini,
    [SIZE.large]: SIZE.tiny
});

