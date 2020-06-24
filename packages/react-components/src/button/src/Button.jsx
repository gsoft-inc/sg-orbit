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
import { bool, element, number, oneOf } from "prop-types";
import { embedBadge } from "../../badge";
import { isNil, isString } from "lodash";

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
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before or after the text.
     */
    icon: element,
    /**
     * An icon can appear on the left or right side of the text.
     */
    iconPosition: oneOf(["left", "right"]),
    /**
     * [Dot](/?path=/docs/components-badge--dot) variant of a badge rendered before the text.
     */
    dot: element,
    /**
     * [Badge](/?path=/docs/components-badge--default-story) rendered after the text.
     */
    badge: element,
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
     * A button can vary in sizes.
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

function throwWhenMutuallyExclusivePropsAreProvided({ dot, badge, icon, iconPosition }) {
    if (!isNil(dot) && !isNil(icon) && iconPosition === "left") {
        throw new Error("@orbit-ui/react-components/Button doesn't support having a dot and a left positioned icon at the same time.");
    }

    if (!isNil(badge) && !isNil(icon) && iconPosition === "right") {
        throw new Error("@orbit-ui/react-components/Button doesn't support having a badge and a right positioned icon at the same time.");
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
        dot,
        badge,
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

    const dotMarkup = !isNil(dot) && embedBadge(dot, {
        size,
        disabled
    });

    const badgeMarkup = !isNil(badge) && embedBadge(badge, {
        size,
        highlight: true,
        disabled
    });

    const content = (
        <>
            {iconPosition === "left" && iconMarkup}{dotMarkup}
            {children}
            {iconPosition === "right" && iconMarkup}{badgeMarkup}
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
                    !isNil(icon) && iconPosition === "left" && "with-left-icon",
                    !isNil(icon) && iconPosition === "right" && "with-right-icon",
                    !isNil(dot) && "with-dot",
                    !isNil(badge) && "with-badge",
                    !hasText && "fitted",
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

export const createButton = createShorthandFactory(Button, (shorthand, props) => {
    if (isString(shorthand)) {
        return (
            <Button {...props}>
                {shorthand}
            </Button>
        );
    }
});

export const createEmbeddedButton = createShorthandFactoryForEmbedded(createButton, {
    [SIZE.micro]: SIZE.micro,
    [SIZE.mini]: SIZE.micro,
    [SIZE.tiny]: SIZE.micro,
    [SIZE.small]: SIZE.mini,
    [SIZE.medium]: SIZE.tiny,
    [SIZE.large]: SIZE.small
});




