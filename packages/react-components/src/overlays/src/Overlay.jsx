import { Transition } from "../../transition";
import { any, bool, func, instanceOf } from "prop-types";
import { createPortal } from "react-dom";
import { forwardRef } from "react";

/*
	- Open transition
	- Create portal - in container or body - Always use portal? I think so
    - Might need somehow to setup a new ThemeProvider since it's in a portal? Maybe Portal handle this.

    - Kind of similar to useAutoControlledPopper
*/

const propTypes = {
    show: bool,
    defaultShow: bool,
    onHide: func,
    hideOnEscape: bool,
    hideOnBlur: bool,
    container: instanceOf(HTMLElement),
    children: any.isRequired
};

export function InnerOverlay({
    show,
    container,
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

    return createPortal(content, container || document.body);
}

InnerOverlay.propTypes = propTypes;

export const Overlay = forwardRef((props, ref) => (
    <InnerOverlay {...props} forwardedRef={ref} />
));

Overlay.displayName = "Overlay";
