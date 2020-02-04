import { Ref, Label as SemanticLabel } from "semantic-ui-react";
import { forwardRef } from "react";
import { func, object, oneOfType } from "prop-types";
import { isNil } from "lodash";
import { throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = ["attached", "color", "circular", "corner", "floating", "horizontal", "image", "onClick", "onRemove", "pointing", "prompt", "removeIcon", "ribbon", "tag"];

const propTypes = {
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

export function PureTag({ forwardedRef, ...props }) {
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-label/tag");

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

export const Tag = forwardRef((props, ref) => (
    <PureTag { ...props } forwardedRef={ref} />
));

