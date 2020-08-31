import "./InputMessage.css";

import { elementType, node, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { getSizeClass, mergeClasses } from "../../shared";
import { isNil } from "lodash";

export function useInputMessage(help, invalid, valid, validationState, size) {
    return (help || invalid || valid) && {
        help,
        invalid,
        valid,
        validationState,
        size
    };
}

const propTypes = {
    help: node,
    invalid: node,
    valid: node,
    validationState: oneOf(["valid", "invalid"]),
    size: oneOf(["small", "medium", "large"]),
    as: oneOfType([string, elementType])
};

export function InnerInputMessage(props) {
    const {
        help,
        invalid,
        valid,
        validationState,
        size,
        className,
        forwardedRef,
        as: ElementType = "span",
        ...rest
    } = props;

    let message = { invalid, valid }[validationState];
    let color = validationState;

    if (isNil(message)) {
        message = help;
        color = "neutral";
    }

    if (isNil(message)) {
        return null;
    }

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui input-message",
                color,
                getSizeClass(size),
                className
            )}
            aria-live="polite"
            ref={forwardedRef}
        >
            {message}
        </ElementType>
    );
}

InnerInputMessage.propTypes = propTypes;

export const InputMessage = forwardRef((props, ref) => (
    <InnerInputMessage {...props} forwardedRef={ref} />
));
