import "./Overlay.css";

import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, cssModule, mergeProps } from "../../shared";
import { ThemeProvider, useThemeContext } from "../../theme-provider";
import { Transition } from "../../transition";
import { createPortal } from "react-dom";

const DefaultElement = "div";

export interface InnerOverlayProps extends InternalProps, Omit<StyledComponentProps<typeof DefaultElement>, "zIndex"> {
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
    as = DefaultElement,
    borderOffset,
    children,
    containerElement,
    forwardedRef,
    show,
    zIndex,
    ...rest
}: InnerOverlayProps): JSX.Element {
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
                            "--o-ui-overlay-border-offset": borderOffset
                        },
                        zIndex
                    }
                )}
            >
                {children}
            </Transition>
        </ThemeProvider>
    );

    return createPortal(content, containerElement || document.body);
}

export const Overlay = forwardRef<any, OmitInternalProps<InnerOverlayProps>>((props, ref) => (
    <InnerOverlay {...props} forwardedRef={ref} />
));

export type OverlayProps = ComponentProps<typeof Overlay>;
