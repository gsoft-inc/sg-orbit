import { Ref, Label as SemanticLabel } from "semantic-ui-react";
import { forwardRef } from "react";
import { func, object, oneOf, oneOfType } from "prop-types";
import { isNil } from "lodash";
import { throwWhenUnsupportedPropIsProvided } from "../../shared";

const UNSUPPORTED_PROPS = ["attached", "color", "circular", "corner", "floating", "horizontal", "image", "onClick", "onRemove", "pointing", "prompt", "removeIcon", "ribbon", "tag"];

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const DEFAULT_SIZE = "medium";

const propTypes = {
    /**
     * A tag can vary in sizes.
     */
    size: oneOf(["mini", "tiny", "small", "medium", "large", "big", "huge", "massive"]),
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    size: DEFAULT_SIZE
};

export function PureTag({ forwardedRef, ...props }) {
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/tag");

    const renderWithRef = () => {
        return (
            <Ref innerRef={forwardedRef}>
                {renderTag()}
            </Ref>
        );
    };

    const renderTag = () => {
        return (
            <SemanticLabel tag circular empty {...props} />
        );
    };

    return isNil(forwardedRef) ? renderTag() : renderWithRef();
}

PureTag.propTypes = propTypes;
PureTag.defaultProps = defaultProps;

export const Tag = forwardRef((props, ref) => (
    <PureTag { ...props } forwardedRef={ref} />
));

