import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef, useEffect, useState } from "react";
import { HtmlElements } from "../../html";
import { InternalProps, OmitInternalProps, StyledComponentProps, isNilOrEmpty, mergeProps, useEventCallback, useIsInitialRender } from "../../shared";

const DefaultElement = "div";

export interface InnerTransitionProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * 	Whether the transition should run on initial mount.
     */
    animateFirstRender?: boolean;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * CSS classes to add to the transitioning element during the enter phase.
     */
    enter?: string;
    /**
     * CSS classes to add to the transitioning element during the leave phase.
     */
    leave?: string;
    /**
     * A controlled show value that determined whether or not the component is displayed.
     */
    show: boolean;
}

export function InnerTransition({
    animateFirstRender = false,
    as = HtmlElements[DefaultElement],
    children,
    enter,
    forwardedRef,
    leave,
    show,
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
                    as,
                    className: show
                        ? isInitialRender
                            ? animateFirstRender ? enter : undefined
                            : enter
                        : leave,
                    onAnimationEnd: !isAnimationDisabled ? handleAnimationEnd : undefined,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const Transition = forwardRef<any, OmitInternalProps<InnerTransitionProps>>((props, ref) => (
    <InnerTransition {...props} forwardedRef={ref} />
));

export type TransitionProps = ComponentProps<typeof Transition>;

// Jest tests requires to disable the animation because "onAnimationEnd" is never fired. I can't figure out why.
// @ts-ignore
Transition.disableAnimation = false;
