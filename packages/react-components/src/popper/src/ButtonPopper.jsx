import { AutoControlledPopper } from "./AutoControlledPopper";
import { element } from "prop-types";
import { forwardRef } from "react";


const propTypes = {
    /**
     * The button trigger.
     */
    button: element.isRequired
};

export function InnerButtonPopper({ button, forwardedRef, ...rest }) {
    return (
        <AutoControlledPopper
            {...rest}
            trigger={button}
            ref={forwardedRef}
        />
    );
}

InnerButtonPopper.propTypes = propTypes;

export const ButtonPopper = forwardRef((props, ref) => (
    <InnerButtonPopper {...props} forwardedRef={ref} />
));
