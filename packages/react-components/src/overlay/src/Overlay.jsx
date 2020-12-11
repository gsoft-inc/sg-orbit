import "./Overlay.css";

import { Transition } from "../../transition";
import { any, bool, instanceOf } from "prop-types";
import { createPortal } from "react-dom";
import { forwardRef } from "react";

/*
TODO:
    - Might need somehow to setup a new ThemeProvider since it's in a portal? Maybe Portal handle this.
*/

const propTypes = {
    /**
     * Whether or not to show the overlay element.
     */
    show: bool,
    /**
     * A DOM element in which the overlay element will be appended via a React portal.
     */
    containerElement: instanceOf(HTMLElement),
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerOverlay({
    show,
    containerElement,
    children,
    forwardedRef,
    ...rest
}) {
    const content = (
        <Transition
            {...rest}
            show={show}
            enter="o-ui-fade-in"
            leave="o-ui-fade-out"
            ref={forwardedRef}
        >
            {children}
        </Transition>
    );

    return createPortal(content, containerElement || document.body);
}

InnerOverlay.propTypes = propTypes;

export const Overlay = forwardRef((props, ref) => (
    <InnerOverlay {...props} forwardedRef={ref} />
));

Overlay.displayName = "Overlay";
