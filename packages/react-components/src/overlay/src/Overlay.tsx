import "./Overlay.css";

import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { DomProps, cssModule, mergeProps } from "../../shared";
import { ThemeProvider } from "../../theme-provider/src/ThemeProvider";
import { Transition } from "../../transition";
import { createPortal } from "react-dom";
import { useThemeContext } from "../../theme-provider";

const defaultElement = "div";

export interface InnerOverlayProps extends DomProps, ComponentProps<typeof defaultElement>{
    /**
     * Whether or not to show the overlay element.
     */
    show: boolean;
    /**
     * Hacky offset utility to apply a transparent CSS border to the overlay.
     * It's useful to prevent the overlay from closing when the mouse goes from the trigger to the overlay.
     */
    borderOffset?: string | number;
    /**
     * A DOM element in which the overlay element will be appended via a React portal.
     */
    containerElement?: HTMLElement;
    /**
     * The z-index of the overlay.
     */
    zIndex?: number;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerOverlay({
    show,
    borderOffset,
    containerElement,
    zIndex,
    as = defaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerOverlayProps) {
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
                        className: cssModule(
                            "o-ui-overlay",
                            borderOffset && "has-border-offset"
                        ),
                        style: {
                            "--o-ui-overlay-border-offset": borderOffset,
                            zIndex
                        },
                        as,
                        ref: forwardedRef
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

export const Overlay = forwardRef<any, Omit<InnerOverlayProps, "forwardedRef">>((props, ref) => (
    <InnerOverlay {...props} forwardedRef={ref} />
));

export type OverlayProps = ComponentProps<typeof Overlay>;

Overlay.displayName = "Overlay";
