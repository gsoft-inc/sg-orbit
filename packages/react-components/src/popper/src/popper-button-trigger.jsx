import { PopperTrigger } from "./popper-trigger";
import { createButtonFromShorthand } from "../../button";
import { element, object, oneOfType } from "prop-types";
import { forwardRef } from "react";
import { isElement } from "react-is";

// TODO:
//  - support button shorthand

const propTypes = {
    /**
     * The button trigger.
     */
    button: oneOfType([element, object]).isRequired
};

function useButtonRenderer(button) {
    return () => {
        if (isElement(button)) {
            return button;
        }

        return createButtonFromShorthand(button);
    };
}

export function InnerPopperButtonTrigger({ button, forwardedRef, ...rest }) {
    const buttonRenderer = useButtonRenderer(button);

    return (
        <PopperTrigger
            {...rest}
            trigger={buttonRenderer()}
            toggleHandler="onClick"
            ref={forwardedRef}
        />
    );
}

InnerPopperButtonTrigger.propTypes = propTypes;

export const PopperButtonTrigger = forwardRef((props, ref) => (
    <InnerPopperButtonTrigger {...props} forwardedRef={ref} />
));
