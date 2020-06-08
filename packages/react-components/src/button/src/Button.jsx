/* eslint-disable react/forbid-foreign-prop-types */

import { Children, cloneElement, forwardRef, useCallback } from "react";
import { EmbeddedIcon, StandaloneIcon } from "../../icons";
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

function hasText(children) {
    return Children.count(children) > 0;
}

function useIconRenderer({ icon, size }, isStandalone) {
    return () => {
        const Component = isStandalone ? StandaloneIcon : EmbeddedIcon;

        return (
            <Component
                icon={icon}
                size={size}
            />
        );
    };
}

// TODO: Change me once EmbeddedLabel exist and Label use `createShorthandFactory`
function useLabelRenderer({ label, size, disabled }) {
    return () => {
        const props = {
            as: "span",
            size: getContentLabelSize(size || SIZE.medium),
            highlight: true,
            disabled: disabled
        };

        if (isElement(label)) {
            return cloneElement(label, props);
        }

        return createLabel({
            ...props,
            ...label
        });
    };
}

// TODO: Change me once EmbeddedTag exist and Tag use `createShorthandFactory`
function useTagRenderer({ tag, size, disabled }) {
    return () => {
        const props = {
            as: "span",
            size: getTagSize(size || SIZE.medium),
            disabled: disabled
        };

        if (isElement(tag)) {
            return cloneElement(tag, props);
        }

        return createTag({
            ...props,
            ...tag
        });
    };
}

function Content({ icon, iconPosition, label, tag, size, disabled, children }) {
    const renderIcon = useIconRenderer({ icon, size }, !hasText(children));
    const renderLabel = useLabelRenderer({ label, size, disabled });
    const renderTag = useTagRenderer({ tag, size, disabled });

    let left;
    let right;

    if (!isNil(icon)) {
        if (iconPosition === "right") {
            right = renderIcon();
        } else {
            left = renderIcon();
        }
    }

    if (!isNil(label)) {
        right = renderLabel();
    }

    if (!isNil(tag)) {
        left = renderTag();
    }

    if (!isNil(left) || !isNil(right)) {
        return (
            <>
                {!isNil(left) && left}
                {children}
                {!isNil(right) && right}
            </>
        );
    }

    return children;
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
                    <Content icon={icon} iconPosition={iconPosition} label={label} tag={tag} size={size} disabled={disabled}>
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




