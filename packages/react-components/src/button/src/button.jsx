/* eslint-disable react/forbid-foreign-prop-types */

import { Children, cloneElement, forwardRef } from "react";
import { EmbeddedIcon, StandaloneIcon } from "../../icons";
import {
    SIZE,
    SemanticRef,
    createShorthandFactory,
    createShorthandFactoryForEmbedded,
    mergeClasses,
    throwWhenUnsupportedPropIsProvided,
    useAutofocus,
    useCombinedRefs,
    useStaticCallback
} from "../../shared";
import { Button as SemanticButton } from "semantic-ui-react";
import { bool, element, number, object, oneOf, oneOfType } from "prop-types";
import { createLabel, getContentLabelSize } from "../../label";
import { createTag, getTagSize } from "../../tag";
import { isElement } from "react-is";
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
    type: "button"
};

function hasText(children) {
    return Children.count(children) > 0;
}

function Icon({ shorthand, size, standalone }) {
    const Component = standalone ? StandaloneIcon : EmbeddedIcon;

    return (
        <Component
            icon={shorthand}
            size={size}
        />
    );
}

// TODO: Change me once EmbeddedLabel exist and Label use `createShorthandFactory`
function Label({ shorthand, size, disabled }) {
    const props = {
        as: "span",
        size: getContentLabelSize(size || SIZE.medium),
        highlight: true,
        disabled: disabled
    };

    if (isElement(shorthand)) {
        return cloneElement(shorthand, props);
    }

    return createLabel({
        ...props,
        ...shorthand
    });
}

// TODO: Change me once EmbeddedTag exist and Tag use `createShorthandFactory`
function Tag({ shorthand, size, disabled }) {
    const props = {
        as: "span",
        size: getTagSize(size || SIZE.medium),
        disabled: disabled
    };

    if (isElement(shorthand)) {
        return cloneElement(shorthand, props);
    }

    return createTag({
        ...props,
        ...shorthand
    });
}

function Content({ icon, iconPosition, label, tag, size, disabled, children }) {
    let left;
    let right;

    if (!isNil(icon)) {
        const component = <Icon shorthand={icon} size={size} standalone={!hasText(children)} />;

        if (iconPosition === "right") {
            right = component;
        } else {
            left = component;
        }
    }

    if (!isNil(label)) {
        right = <Label shorthand={label} size={size} disabled={disabled} />;
    }

    if (!isNil(tag)) {
        left = <Tag shorthand={tag} size={size} disabled={disabled} />;
    }

    if (!isNil(left) || !isNil(right)) {
        return <>{!isNil(left) && left}{children}{!isNil(right) && right}</>;
    }

    return children;
}

function throwWhenMutuallyExclusivePropsAreProvided({ label, tag, icon, iconPosition }) {
    if (!isNil(label) && !isNil(icon) && iconPosition === "right") {
        throw new Error("@orbit-ui/react-components/button doesn't support having a label and a right positioned icon at the same time.");
    }

    if (!isNil(tag) && !isNil(icon) && iconPosition !== "right") {
        throw new Error("@orbit-ui/react-components/button doesn't support having a tag and a left positioned icon at the same time.");
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

    const innerRef = useCombinedRefs(forwardedRef);

    const setFocus = useStaticCallback(() => {
        if (!isNil(innerRef.current)) {
            innerRef.current.focus();
        }
    });

    const autofocusProps = useAutofocus(autofocus, autofocusDelay, disabled, setFocus);

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
                    focus && "focus",
                    hover && "hover",
                    !isNil(icon) && "with-icon",
                    !isNil(icon) && iconPosition === "right" && "with-icon-right",
                    !isNil(label) && "with-label",
                    !isNil(tag) && "with-tag",
                    !hasText(children) && "without-text",
                    className)
                }
            >
                <If condition={!loading}>
                    <Content
                        icon={icon}
                        iconPosition={iconPosition}
                        label={label}
                        tag={tag}
                        size={size}
                        disabled={disabled}
                    >
                        {children}
                    </Content>
                </If>
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




