/* eslint-disable react/forbid-foreign-prop-types */

import { ArgumentError, BIG, HUGE, MASSIVE, MINI, SemanticRef, mergeClasses, throwWhenUnsupportedPropIsProvided } from "../../shared";
import { Children, cloneElement, forwardRef } from "react";
import { Label as SemanticLabel } from "semantic-ui-react";
import { bool, element, func, object, oneOf, oneOfType, string } from "prop-types";
import { createButton, getContentButtonSize } from "../../button";
import { createContentIcon, createStandaloneIcon } from "../../icons";
import { createTag, getTagSize } from "../../tag";
import { isElement } from "react-is";
import { isNil } from "lodash";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["micro", "mini","tiny","small","medium","large","big","huge","massive"];
const DEFAULT_SIZE = "medium";

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
    focus: bool,
    /**
     * A label can vary in sizes.
     */
    size: oneOf(SIZES),
    /**
     * A label can have a disabled look.
     */
    disabled: bool,
    /**
     * @ignore
     */
    className: string,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    naked: false,
    iconPosition: "left",
    highlight: false,
    disabled: false,
    // eslint-disable-next-line react/default-props-match-prop-types
    size: DEFAULT_SIZE
};

function throwWhenMutuallyExclusivePropsAreProvided({ button, compact, circular, tag, icon, iconPosition }) {
    if (!isNil(button) && !isNil(icon) && iconPosition === "right") {
        throw new ArgumentError("@orbit-ui/react-components/label doesn't support having a button and a right positioned icon at the same time.");
    }

    if (!isNil(tag) && !isNil(icon) && iconPosition === "left") {
        throw new ArgumentError("@orbit-ui/react-components/label doesn't support having a tag and a left positioned icon at the same time.");
    }

    if (compact && circular) {
        throw new ArgumentError("@orbit-ui/react-components/label doesn't support being circular and compact at the same time.");
    }
}

function throwWhenUnsupportedSizeIsProvided({ circular, size }) {
    if (circular) {
        if (size === MINI) {
            throw new ArgumentError(`@orbit-ui/react-components/label doesn't support "${MINI}" size when "circular".`);
        }
    } else {
        if (size === BIG || size === HUGE || size === MASSIVE) {
            throw new ArgumentError(`@orbit-ui/react-components/label doesn't support "${BIG}", "${HUGE}" or "${MASSIVE}" sizes.`);
        }
    }
}

function hasText(content, children) {
    return !isNil(content) || Children.count(children) > 0;
}

function getText(content, children) {
    return content || children;
}

function useIconRenderer({ icon, size }, isStandalone) {
    return () => {
        return !isStandalone ? createContentIcon(icon, size) : createStandaloneIcon(icon, size);
    };
}

function useButtonRenderer({ button, size }) {
    return () => {
        const props = {
            size: getContentButtonSize(size),
            circular: true,
            ghost: true,
            secondary: true,
            type: "button"
        };

        if (isElement(button)) {
            return cloneElement(button, props);
        }

        return createButton({
            ...props,
            ...button
        });
    };
}

function useTagRenderer({ tag, size }) {
    return () => {
        const props = {
            as: "span",
            size: getTagSize(size)
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

function useContentRenderer({ button, icon, iconPosition, tag, size, content, children }) {
    const renderIcon = useIconRenderer({ icon, size }, !hasText(content, children));
    const renderButton = useButtonRenderer({ button, size });
    const renderTag = useTagRenderer({ tag, size });

    return () => {
        let left;
        let right;

        if (!isNil(icon)) {
            if (iconPosition === "right") {
                right = renderIcon();
            } else {
                left = renderIcon();
            }
        }

        if (!isNil(button)) {
            right = renderButton();
        }

        if (!isNil(tag)) {
            left = renderTag();
        }

        if (!isNil(left) || !isNil(right)) {
            return <>{!isNil(left) && left}{getText(content, children)}{!isNil(right) && right}</>;
        }

        return getText(content, children);
    };
}

function useLabelRenderer({ naked, button, compact, icon, iconPosition, tag, highlight, disabled, size, className, content, children, rest }, renderedContent) {
    return () => {
        const classes = mergeClasses(
            naked && "naked",
            highlight && "highlight",
            disabled && "disabled",
            !isNil(compact) && "compact",
            !isNil(button) && "with-button",
            !isNil(icon) && "with-icon",
            !isNil(icon) && iconPosition === "right" && "with-icon-right",
            !isNil(tag) && "with-tag",
            !hasText(content, children) && "without-text",
            className
        );

        return (
            <SemanticLabel
                {...rest}
                size={size}
                className={classes}
            >
                {renderedContent}
            </SemanticLabel>
        );
    };
}

function useRenderer({ forwardedRef }, label) {
    return () => {
        return (
            <SemanticRef innerRef={forwardedRef}>
                {label}
            </SemanticRef>
        );
    };
}

export function InnerLabel(props) {
    const { naked, button, compact, icon, iconPosition, tag, highlight, disabled, size, className, content, children, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/label");
    throwWhenMutuallyExclusivePropsAreProvided(props);
    throwWhenUnsupportedSizeIsProvided(props);

    const renderContent = useContentRenderer({ button, icon, iconPosition, tag, size, content, children });
    const renderLabel = useLabelRenderer({ naked, button, compact, icon, iconPosition, tag, highlight, disabled, size, className, content, children, rest }, renderContent());
    const render = useRenderer({ forwardedRef }, renderLabel());

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
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



