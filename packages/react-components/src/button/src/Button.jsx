/* eslint-disable react/forbid-foreign-prop-types */

import { Children, forwardRef, useCallback } from "react";
import { EmbeddedIcon } from "../../icons";
import {
    SIZE,
    SemanticRef,
    createShorthandFactory,
    createShorthandFactoryForEmbedded,
    mergeClasses,
    throwWhenUnsupportedPropIsProvided,
    useAutofocus,
    useMergedRefs
} from "../../shared";
import { Button as SemanticButton } from "semantic-ui-react";
import { bool, element, number, object, oneOf, oneOfType } from "prop-types";
import { createEmbeddedLabel } from "../../label";
import { createEmbeddedTag } from "../../tag";
import { isNil } from "lodash";

const SIZES = ["micro", "mini", "tiny", "small", "medium", "large"];
const UNSUPPORTED_PROPS = ["animated", "attached", "color", "labelPosition", "floated", "inverted"];

const propTypes = {
    /**
     * A ghost button doesn't have a background color until it's hovered.
     */
    ghost: bool,
    /**
     * A button can look like a link.
     */
    link: bool,
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) for an [icon](/?path=/docs/components-icon--default-story).
     */
    icon: element,
    /**
     * An icon can appear on the left or right.
     */
    iconPosition: oneOf(["left", "right"]),
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) for a [label](/?path=/docs/components-label--default-story).
     */
    label: oneOfType([element, object]),
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) for a [tag](/?path=/docs/components-tag--default-story).
     */
    tag: oneOfType([element, object]),
    /**
     * A button can be colorless. Use this variant if you need to customize the button.
     */
    naked: bool,
    /**
     * Whether or not the checkbox should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * An input can vary in sizes.
     */
    size: oneOf(SIZES),
    /**
     * The button type.
     */
    type: oneOf(["button", "submit", "reset"])
};

const defaultProps = {
    iconPosition: "left",
    type: "button"
};

function throwWhenMutuallyExclusivePropsAreProvided({ label, tag, icon, iconPosition }) {
    if (!isNil(label) && !isNil(icon) && iconPosition === "right") {
        throw new Error("@orbit-ui/react-components/Button doesn't support having a label and a right positioned icon at the same time.");
    }

    if (!isNil(tag) && !isNil(icon) && iconPosition === "left") {
        throw new Error("@orbit-ui/react-components/Button doesn't support having a tag and a left positioned icon at the same time.");
    }
}

export function InnerButton(props) {
    const {
        basic,
        ghost,
        link,
        naked,
        icon,
        iconPosition,
        label,
        tag,
        autofocus,
        autofocusDelay,
        size,
        focus,
        hover,
        loading,
        disabled,
        className,
        forwardedRef,
        children,
        ...rest
    } = props;
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/Button");
    throwWhenMutuallyExclusivePropsAreProvided(props);

    const innerRef = useMergedRefs(forwardedRef);

    const setFocus = useCallback(() => {
        if (!isNil(innerRef.current)) {
            innerRef.current.focus();
        }
    }, [innerRef]);

    const autofocusProps = useAutofocus(autofocus, autofocusDelay, disabled, setFocus);

    const hasText = Children.count(children) > 0;

    const iconMarkup = !isNil(icon) && (
        <EmbeddedIcon icon={icon} size={size} standalone={!hasText} />
    );

    const labelMarkup = !isNil(label) && createEmbeddedLabel(label, {
        as: "span",
        size,
        highlight: true,
        disabled: disabled
    });

    const tagMarkup = !isNil(tag) && createEmbeddedTag(tag, {
        as: "span",
        size,
        disabled: disabled
    });

    const content = (
        <>
            {iconPosition === "left" && iconMarkup}{tagMarkup}
            {children}
            {iconPosition === "right" && iconMarkup}{labelMarkup}
        </>
    );

    return (
        <SemanticRef innerRef={innerRef}>
            <SemanticButton
                data-testid="button"
                {...rest}
                {...autofocusProps}
                basic={basic}
                size={size}
                loading={loading}
                disabled={disabled}
                className={mergeClasses(
                    naked && "naked",
                    ghost && "ghost",
                    link && "link",
                    !isNil(icon) && "with-icon",
                    !isNil(icon) && iconPosition === "right" && "with-icon-right",
                    !isNil(label) && "with-label",
                    !isNil(tag) && "with-tag",
                    !hasText && "without-text",
                    focus && "focus",
                    hover && "hover",
                    className)
                }
            >
                {content}
            </SemanticButton>
        </SemanticRef>
    );
}

InnerButton.propTypes = propTypes;
InnerButton.defaultProps = defaultProps;

export const Button = forwardRef((props, ref) => (
    <InnerButton { ...props } forwardedRef={ref} />
));

// Button.Or is not supported yet.
[InnerButton, Button].forEach(x => {
    x.Content = SemanticButton.Content;
    x.Group = SemanticButton.Group;
});

if (!isNil(SemanticButton.propTypes)) {
    SemanticButton.propTypes.size = oneOf(SIZES);
}

export const createButton = createShorthandFactory(Button);

export const createEmbeddedButton = createShorthandFactoryForEmbedded(createButton, {
    [SIZE.micro]: SIZE.micro,
    [SIZE.mini]: SIZE.micro,
    [SIZE.tiny]: SIZE.micro,
    [SIZE.small]: SIZE.mini,
    [SIZE.medium]: SIZE.tiny,
    [SIZE.large]: SIZE.small
});




