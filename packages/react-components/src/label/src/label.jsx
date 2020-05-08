import { ArgumentError, BIG, HUGE, LARGE, MASSIVE, MEDIUM, MINI, SMALL, SemanticRef, TINY, mergeClasses, throwWhenUnsupportedPropIsProvided } from "../../shared";
import { Children, cloneElement, forwardRef } from "react";
import { Label as SemanticLabel } from "semantic-ui-react";
import { bool, element, func, object, oneOf, oneOfType, string } from "prop-types";
import { createButtonFromShorthand } from "../../button";
import { createIconForControl } from "../../icons";
import { createTagFromShorthand } from "../../tag";
import { isElement } from "react-is";
import { isNil } from "lodash";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const DEFAULT_SIZE = "medium";

const UNSUPPORTED_PROPS = ["attached", "color", "corner", "empty", "floating", "horizontal", "image", "onRemove", "pointing", "prompt", "removeIcon", "ribbon"];

const BUTTON_SIZE = {
    [MINI]: MINI,
    [TINY]: TINY,
    [SMALL]: SMALL,
    [MEDIUM]: MEDIUM,
    [LARGE]: LARGE
};

const propTypes = {
    /**
     * A label can be colorless. Use this variant if you need to customize the label.
     */
    naked: bool,
    /**
     * A label can contain a button.
     */
    button: oneOfType([element, object]),
    /**
     * A label can contain an icon.
     */
    icon: element,
    /**
     * A label can be compact.
     */
    compact: bool,
    /**
     * An icon can appear on the left or right.
     */
    iconPosition: oneOf(["left", "right"]),
    /**
     * A label can contain a tag.
     */
    tag: oneOfType([element, object]),
    /**
     * Whether to add emphasis on the label text or not.
     */
    highlight: bool,
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

function useButtonRenderer({ button, size }) {
    return () => {
        const props = {
            size: BUTTON_SIZE[size],
            circular: true,
            ghost: true,
            secondary: true,
            type: "button"
        };

        if (isElement(button)) {
            return cloneElement(button, props);
        }

        return createButtonFromShorthand({
            ...props,
            ...button
        });
    };
}

function useTagRenderer({ tag }) {
    return () => {
        const props = {
            as: "span",
            size: "mini"
        };

        if (isElement(tag)) {
            return cloneElement(tag, props);
        }

        return createTagFromShorthand({
            ...props,
            ...tag
        });
    };
}

function useContentRenderer({ button, icon, iconPosition, tag, size, children }) {
    const renderButton = useButtonRenderer({ button, size });
    const renderTag = useTagRenderer({ tag });

    return () => {
        let left;
        let right;

        if (!isNil(icon)) {
            if (iconPosition === "right") {
                right = createIconForControl(icon, size);
            } else {
                left = createIconForControl(icon, size);
            }
        }

        if (!isNil(button)) {
            right = renderButton();
        }

        if (!isNil(tag)) {
            left = renderTag();
        }

        if (!isNil(left) || !isNil(right)) {
            return <>{!isNil(left) && left}{children}{!isNil(right) && right}</>;
        }

        return children;
    };
}

function useLabelRenderer({ naked, button, compact, icon, iconPosition, tag, highlight, disabled, size, className, children, rest }, content) {
    return () => {
        const hasText = Children.count(children) > 0;

        const classes = mergeClasses(
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
        );

        return (
            <SemanticLabel
                {...rest}
                size={size}
                className={classes}
            >
                {content}
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

export function PureLabel(props) {
    const { naked, button, compact, icon, iconPosition, tag, highlight, disabled, size, className, children, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/label");
    throwWhenMutuallyExclusivePropsAreProvided(props);
    throwWhenUnsupportedSizeIsProvided(props);

    const renderContent = useContentRenderer({ button, icon, iconPosition, tag, size, children });
    const renderLabel = useLabelRenderer({ naked, button, compact, icon, iconPosition, tag, highlight, disabled, size, className, children, rest }, renderContent());
    const render = useRenderer({ forwardedRef }, renderLabel());

    return render();
}

PureLabel.propTypes = propTypes;
PureLabel.defaultProps = defaultProps;

export const Label = forwardRef((props, ref) => (
    <PureLabel { ...props } forwardedRef={ref} />
));

[PureLabel, Label].forEach(x => {
    x.Detail = SemanticLabel.Detail;
    x.Group = SemanticLabel.Group;
});

