import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, useEffect, useState } from "react";
import { forwardRef, isNilOrEmpty, mergeProps, useEventCallback, useIsInitialRender } from "../../shared";

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
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerTransition({
    show,
    animateFirstRender = false,
    enter,
    leave,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerTransitionProps) {
    const [isVisible, setIsVisible] = useState(show);

    const isInitialRender = useIsInitialRender();

    useEffect(() => {
        if (show) {
            setIsVisible(true);
        } else if (isNilOrEmpty(leave)) {
            setIsVisible(false);
        }
    }, [show, leave]);

    const handleAnimationEnd = useEventCallback(() => {
        setIsVisible(show);
    });

    // @ts-ignore
    const isAnimationDisabled = Transition.disableAnimation;
    const shouldRender = isAnimationDisabled ? show : isVisible;

    if (!shouldRender) {
        return null;
    }

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    onAnimationEnd: !isAnimationDisabled ? handleAnimationEnd : undefined,
                    className: show
                        ? isInitialRender
                            ? animateFirstRender ? enter : undefined
                            : enter
                        : leave,
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const Transition = forwardRef<InnerTransitionProps>((props, ref) => (
    <InnerTransition {...props} forwardedRef={ref} />
));

export type TransitionProps = ComponentProps<typeof Transition>;

// Jest tests requires to disable the animation because "onAnimationEnd" is never fired. I can't figure out why.
// @ts-ignore
Transition.disableAnimation = false;
