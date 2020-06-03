import { PopperTrigger } from "./PopperTrigger";
import { createButton } from "../../button";
import { element, object, oneOfType } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * The button trigger.
     */
    button: oneOfType([element, object]).isRequired
};

export function InnerPopperButtonTrigger({ button, forwardedRef, ...rest }) {
    const trigger = createButton(button);

    return (
        <PopperTrigger
            {...rest}
            trigger={trigger}
            toggleHandler="onClick"
            ref={forwardedRef}
        />
    );
}

InnerPopperButtonTrigger.propTypes = propTypes;

export const PopperButtonTrigger = forwardRef((props, ref) => (
    <InnerPopperButtonTrigger {...props} forwardedRef={ref} />
));
