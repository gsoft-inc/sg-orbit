import { PopperTrigger } from "./popper-trigger";
import { createButton } from "../../button";
import { element, object, oneOfType } from "prop-types";
import { forwardRef } from "react";
import { isElement } from "react-is";

const propTypes = {
    /**
     * The button trigger.
     */
    button: oneOfType([element, object]).isRequired
};

function useButtonRenderer({ button }) {
    return () => {
        if (isElement(button)) {
            return button;
        }

        return createButton(button);
    };
}

function useRenderer({ forwardedRef, rest }, button) {
    return () => {
        return (
            <PopperTrigger
                {...rest}
                trigger={button}
                toggleHandler="onClick"
                ref={forwardedRef}
            />
        );
    };
}

export function InnerPopperButtonTrigger({ button, forwardedRef, ...rest }) {
    const renderButton = useButtonRenderer({ button });
    const render = useRenderer({ forwardedRef, rest }, renderButton());

    return render();
}

InnerPopperButtonTrigger.propTypes = propTypes;

export const PopperButtonTrigger = forwardRef((props, ref) => (
    <InnerPopperButtonTrigger {...props} forwardedRef={ref} />
));
