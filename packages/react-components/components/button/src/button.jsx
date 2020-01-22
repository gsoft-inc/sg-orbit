import { Ref, Button as SemanticButton } from "semantic-ui-react";
import { bool, func, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = ["animated", "attached", "color", "labelPosition", "floated", "inverted"];

const propTypes = {
    /**
     * A ghost button doesn't have a background color until it's hovered.
     */
    ghost: bool,
    /**
     * A button can be formatted to accept a nested icon _(overseed the original prop)_.
     */
    icon: bool,
    /**
     * A button can be formatted to accept a nested label _(overseed the original prop)_.
     */
    label: bool,
    /**
     * A button can be colorless. Use this variant if you need to customize the button.
     */
    naked: bool,
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
    ghost: false,
    icon: false,
    label: false,
    naked: false
};

export function PureButton({ naked, ghost, icon, label, className, forwardedRef, children, ...props }) {
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS);

    const renderWithRef = () => {
        return (
            <Ref innerRef={forwardedRef}>
                {renderButton()}
            </Ref>
        );
    };

    const renderButton = () => {
        const classes = mergeClasses(
            naked && "naked",
            ghost && "ghost",
            icon && "icon",
            label && "with-label",
            className
        );

        return <SemanticButton className={classes} {...props}>{children}</SemanticButton>;
    };

    return isNil(forwardedRef) ? renderButton() : renderWithRef();
}

PureButton.propTypes = propTypes;
PureButton.defaultProps = defaultProps;

export const Button = forwardRef((props, ref) => (
    <PureButton { ...props } forwardedRef={ref} />
));

[PureButton, Button].forEach(x => {
    x.Content = SemanticButton.Content;
    x.Group = SemanticButton.Group;
    x.Or = SemanticButton.Or;
});

// eslint-disable-next-line react/forbid-foreign-prop-types
if (!isNil(SemanticButton.propTypes)) {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    SemanticButton.propTypes.size = oneOf(["tiny", "small", "medium", "large"]);
}
