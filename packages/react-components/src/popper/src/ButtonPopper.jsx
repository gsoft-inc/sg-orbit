import { AutoControlledPopper } from "./AutoControlledPopper";
import { createButton } from "../../button";
import { element, object, oneOfType } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * The button trigger.
     */
    button: oneOfType([element, object]).isRequired
};

export function InnerButtonPopper({ button, forwardedRef, ...rest }) {
    const trigger = createButton(button);

    return (
        <AutoControlledPopper
            {...rest}
            trigger={trigger}
            ref={forwardedRef}
        />
    );
}

InnerButtonPopper.propTypes = propTypes;

export const ButtonPopper = forwardRef((props, ref) => (
    <InnerButtonPopper {...props} forwardedRef={ref} />
));
