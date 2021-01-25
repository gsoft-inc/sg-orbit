import "./Overlay.css";

import { ThemeProvider } from "../../theme-provider/src/ThemeProvider";
import { Transition } from "../../transition";
import { any, bool, instanceOf } from "prop-types";
import { createPortal } from "react-dom";
import { forwardRef } from "react";
import { mergeProps } from "../../shared";
import { useThemeContext } from "../../theme-provider";

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
    // Since the overlay is rendered through a portal it might not be embedded in the theme DOM element.
    const { theme, colorScheme } = useThemeContext();

    const content = (
        <ThemeProvider theme={theme} colorScheme={colorScheme}>
            <Transition
                {...mergeProps(
                    rest,
                    {
                        show,
                        enter: "o-ui-fade-in",
                        leave: "o-ui-fade-out",
                        className: "o-ui-overlay",
                        ref: forwardedRef
                    }
                )}
            >
                {children}
            </Transition>
        </ThemeProvider>
    );

    return createPortal(content, containerElement || document.body);
}

InnerOverlay.propTypes = propTypes;

export const Overlay = forwardRef((props, ref) => (
    <InnerOverlay {...props} forwardedRef={ref} />
));

Overlay.displayName = "Overlay";
