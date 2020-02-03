import { Ref, Label as SemanticLabel } from "semantic-ui-react";
import { bool, element, func, object, oneOf, oneOfType, string } from "prop-types";
import { cloneElement, forwardRef } from "react";
import { isNil } from "lodash";
import { mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = ["attached", "corner", "floating", "horizontal", "image", "onClick", "onRemove", "pointing", "prompt", "removeIcon", "ribbon"];

const propTypes = {
    /**
     * A label can be colorless. Use this variant if you need to customize the label.
     */
    naked: bool,
    // /**
    //  * A label can contain a button. The component will take care of rendering the button element once an icon for the button is provided.
    //  */
    // buttonIcon: element,
    button: bool,
    /**
     * A label can contain an icon.
     */
    icon: element,
    /**
     * An icon can appear on the left or right.
     */
    iconPosition: oneOf(["right", "left"]),
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
    button: false,
    iconPosition: "left"
};

// function throwWhenMutuallyExclusivePropsAreProvided({ buttonIcon, iconPosition }) {
//     if (!isNil(buttonIcon) && iconPosition === "right") {
//         throw new ArgumentError("@orbit/react-label doesn't support having a \"buttonIcon\" and \"iconPosition=right\" at the same time.");
//     }
// }

export function PureLabel(props) {
    const { naked, button, icon, iconPosition, className, children, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-label");
    // throwWhenMutuallyExclusivePropsAreProvided(props);

    const renderWithRef = () => {
        return (
            <Ref innerRef={forwardedRef}>
                {renderLabel()}
            </Ref>
        );
    };

    const renderIcon = () => {
        return cloneElement(icon, {
            className: mergeClasses(
                "icon",
                icon.props && icon.props.className
            )
        });
    };

    const renderLabelContent = () => {
        if (!isNil(icon)) {
            if (iconPosition === "right") {
                return <>{children}{renderIcon()}</>;
            }

            return <>{renderIcon()}{children}</>;
        }

        return children;
    };

    const renderLabel = () => {
        const classes = mergeClasses(
            naked && "naked",
            button && "with-button",
            !isNil(icon) && "with-icon",
            !isNil(icon) && iconPosition === "right" && "with-icon-right",
            className
        );

        return <SemanticLabel className={classes} {...rest}>{renderLabelContent()}</SemanticLabel>;
    };

    return isNil(forwardedRef) ? renderLabel() : renderWithRef();
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

