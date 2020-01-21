/* eslint-disable react/forbid-foreign-prop-types */

import { Ref, Input as SemanticInput } from "semantic-ui-react";
import { cloneElement, createRef, forwardRef, useImperativeHandle, useRef } from "react";
import { element, func, object, oneOf, oneOfType } from "prop-types";
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

function renderIcon(icon, { loading }) {
    if (!isNil(icon) && !loading) {
        return cloneElement(icon, {
            className: mergeClasses(
                "icon",
                icon.props && icon.props.className
            )
        });
    }

    return undefined;
}

export function PureInput(props) {
    const { children, icon, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS);

    const inputRef = useRef();

    useImperativeHandle(forwardedRef, () => inputRef.current.querySelector("input"));

    return (
        <Ref innerRef={inputRef}>
            <SemanticInput icon={renderIcon(icon, props)} {...rest}>{children}</SemanticInput>
        </Ref>
    );
}

PureInput.propTypes = propTypes;

export const Input = forwardRef((props, ref) => {
    const forwardedRef = !isNil(ref) ? ref : createRef();

    return <PureInput { ...props } forwardedRef={forwardedRef} />;
});

if (!isNil(SemanticInput.propTypes)) {
    SemanticInput.propTypes.size = oneOf(["tiny", "small", "medium", "large"]);
}
