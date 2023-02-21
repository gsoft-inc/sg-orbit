import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, cssModule, getBodyElement, mergeProps } from "../../shared";
import { ThemeProvider, useColorSchemeContext, useThemeContext } from "../../styling";

import { Transition } from "../../transition";
import { createPortal } from "react-dom";

const DefaultElement = "div";

export interface InnerOverlayProps extends InternalProps, Omit<StyledComponentProps<typeof DefaultElement>, "zIndex"> {
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
    children,
    containerElement,
    forwardedRef,
    show,
    zIndex,
    ...rest
}: InnerOverlayProps): JSX.Element {
    // Since the overlay is rendered through a portal it might not be embedded in the theme DOM element.
    const { colorScheme } = useColorSchemeContext();
    const { theme } = useThemeContext();

    const content = (
        <Transition
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        // The "o-ui" class is a small hack to allow nesting ThemeProvider inside the transition instead of outside to prevent rendering a div when the overlay is not visible.
                        // Since the transition component use the "o-ui-fade-in" and "o-ui-fade-out" classes which are using CSS variables declared inside an ".o-ui" class
                        // we must render the class somewhere.
                        "o-ui",
                        "overlay"
                    ),
                    enter: "o-ui-fade-in",
                    leave: "o-ui-fade-out",
                    ref: forwardedRef,
                    show,
                    zIndex
                }
            )}
        >
            <ThemeProvider colorScheme={colorScheme} theme={theme}>
                {children}
            </ThemeProvider>
        </Transition>
    );

    const _container = containerElement ?? getBodyElement();

    if (_container) {
        return createPortal(content, _container);
    }

    return null;
}

InnerOverlay.defaultElement = DefaultElement;

export const Overlay = forwardRef<any, OmitInternalProps<InnerOverlayProps>>((props, ref) => (
    <InnerOverlay {...props} forwardedRef={ref} />
));

export type OverlayProps = ComponentProps<typeof Overlay>;
