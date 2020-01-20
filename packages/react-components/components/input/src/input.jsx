/* eslint-disable react/forbid-foreign-prop-types */

import { Ref, Input as SemanticInput } from "semantic-ui-react";
import { forwardRef } from "react";
import { func, object, oneOf, oneOfType } from "prop-types";
import { isNil } from "lodash";
import { throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = ["action", "actionPosition", "inverted"];

const propTypes = {
    /**
     * @ignore
     */
    innerRef: oneOfType([object, func])
};

export function PureInput({ children, innerRef, ...props }) {
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS);

    const renderWithRef = () => {
        return (
            <Ref innerRef={innerRef}>
                {renderInput()}
            </Ref>
        );
    };

    const renderInput = () => {
        return <SemanticInput {...props}>{children}</SemanticInput>;
    };

    return isNil(innerRef) ? renderInput() : renderWithRef();
}

PureInput.propTypes = propTypes;

export const Input = forwardRef((props, ref) => (
    <PureInput { ...props } innerRef={ref} />
));

if (!isNil(SemanticInput.propTypes)) {
    SemanticInput.propTypes.size = oneOf(["tiny", "small", "medium", "large"]);
}
