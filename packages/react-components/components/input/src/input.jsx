/* eslint-disable react/forbid-foreign-prop-types */

import { Ref, Input as SemanticInput } from "semantic-ui-react";
import { cloneElement } from "react";
import { element, func, object, oneOf, oneOfType } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = ["action", "actionPosition", "inverted"];

const propTypes = {
    icon: element,
    /**
     * @ignore
     */
    innerRef: oneOfType([object, func])
};

function renderIcon(icon) {
    if (!isNil(icon)) {
        return cloneElement(icon, {
            className: mergeClasses(
                "icon",
                icon.props && icon.props.className
            )
        });
    }

    return null;
}

export function PureInput({ children, icon, innerRef, ...props }) {
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS);

    const renderWithRef = () => {
        return (
            <Ref innerRef={innerRef}>
                {renderInput()}
            </Ref>
        );
    };

    const renderInput = () => {
        return <SemanticInput icon={renderIcon(icon)} {...props}>{children}</SemanticInput>;
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
