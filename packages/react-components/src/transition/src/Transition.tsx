import { Box } from "../../box";
import { ElementType, ReactNode, useEffect, useState } from "react";
import { forwardRef, mergeProps, useEventCallback, useIsInitialRender } from "../../shared";

export interface InnerTransitionProps {
    /**
     * A controlled show value that determined whether or not the component is displayed.
     */
    show: boolean;
    /**
     * 	Whether the transition should run on initial mount.
     */
    animateFirstRender?: boolean;
    /**
     * CSS classes to add to the transitioning element during the enter phase.
     */
    enter?: string;
    /**
     * CSS classes to add to the transitioning element during the leave phase.
     */
    leave?: string;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * @ignore
     */
    children: ReactNode;
}

export const Transition = forwardRef<InnerTransitionProps>(({
    show,
    animateFirstRender = false,
    enter,
    leave,
    as = "div",
    children,
    ...rest
}, ref) => {
    const [isVisible, setIsVisible] = useState(show);

    const isInitialRender = useIsInitialRender();

    useEffect(() => {
        if (show) {
            setIsVisible(true);
        }
    }, [show]);

    const handleAnimationEnd = useEventCallback(() => {
        setIsVisible(show);
    });

    if (!isVisible) {
        return null;
    }

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    onAnimationEnd: handleAnimationEnd,
                    className: show
                        ? isInitialRender
                            ? animateFirstRender && enter
                            : enter
                        : leave,
                    as,
                    ref
                }
            )}
        >
            {children}
        </Box>
    );
});

Transition.displayName = "Transition";
