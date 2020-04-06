import { Ref, Label as SemanticLabel } from "semantic-ui-react";
import { bool, func, object, oneOf, oneOfType } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { mergeClasses, throwWhenUnsupportedPropIsProvided } from "../../shared";

const UNSUPPORTED_PROPS = ["attached", "color", "circular", "corner", "floating", "horizontal", "image", "onClick", "onRemove", "pointing", "prompt", "removeIcon", "ribbon", "tag"];

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const DEFAULT_SIZE = "medium";

const propTypes = {
    /**
     * A tag can vary in sizes.
     */
    size: oneOf(["mini", "tiny", "small", "medium", "large", "big", "huge", "massive"]),
    /**
     * A tag can have a disabled look.
     */
    disabled: bool,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    size: DEFAULT_SIZE,
    disabled: false
};

export function PureTag({ forwardedRef, className, disabled, ...props }) {
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/tag");

    const renderWithRef = () => {
        return (
            <Ref innerRef={forwardedRef}>
                {renderTag()}
            </Ref>
        );
    };

    const renderTag = () => {
        const classes = mergeClasses(
            disabled && "disabled",
            className
        );

        return (
            <SemanticLabel tag circular empty className={classes} {...props} />
        );
    };

    return isNil(forwardedRef) ? renderTag() : renderWithRef();
}

PureTag.propTypes = propTypes;
PureTag.defaultProps = defaultProps;

export const Tag = forwardRef((props, ref) => (
    <PureTag { ...props } forwardedRef={ref} />
));

