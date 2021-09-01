import "./Overlay.css";

import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitComponentProps, StyleProps, cssModule, mergeProps } from "../../shared";
import { ThemeProvider, useThemeContext } from "../../theme-provider";
import { Transition } from "../../transition";
import { createPortal } from "react-dom";

const DefaultElement = "div";

export interface InnerOverlayProps extends StyleProps, InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * Hacky offset utility to apply a transparent CSS border to the overlay.
     * It's useful to prevent the overlay from closing when the mouse goes from the trigger to the overlay.
     */
    borderOffset?: string | number;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * A DOM element in which the overlay element will be appended via a React portal.
     */
    containerElement?: HTMLElement;
    /**
     * Whether or not to show the overlay element.
     */
    show: boolean;
    /**
     * The z-index of the overlay.
     */
    zIndex?: number;
}

export function InnerOverlay({
    show,
    borderOffset,
    containerElement,
    zIndex,
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerOverlayProps) {
    // Since the overlay is rendered through a portal it might not be embedded in the theme DOM element.
    const { colorScheme, theme } = useThemeContext();

    const content = (
        <ThemeProvider colorScheme={colorScheme} theme={theme}>
            <Transition
                {...mergeProps(
                    rest,
                    {
                        as,
                        className: cssModule(
                            "o-ui-overlay",
                            borderOffset && "has-border-offset"
                        ),
                        enter: "o-ui-fade-in",
                        leave: "o-ui-fade-out",
                        ref: forwardedRef,
                        show,
                        style: {
                            "--o-ui-overlay-border-offset": borderOffset,
                            zIndex
                        }
                    }
                )}
            >
                {children}
            </Transition>
        </ThemeProvider>
    );

    // A fragment is wrapping the result to make this component work with react-docgen: https://github.com/reactjs/react-docgen/issues/336
    return (
        <>
            {createPortal(content, containerElement || document.body)}
        </>
    );
}

export const Overlay = forwardRef<any, OmitInternalProps<InnerOverlayProps>>((props, ref) => (
    <InnerOverlay {...props} forwardedRef={ref} />
));

export type OverlayProps = ComponentProps<typeof Overlay>;
