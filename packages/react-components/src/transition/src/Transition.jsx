import { Box } from "../../box";
import { any, bool, elementType, oneOfType, string } from "prop-types";
import { forwardRef, useEffect, useState } from "react";
import { mergeClasses, useEventCallback, useIsInitialRender } from "../../shared";

const propTypes = {
    /**
     * A controlled show value that determined whether or not the component is displayed.
     */
    show: bool.isRequired,
    /**
     * 	Whether the transition should run on initial mount.
     */
    animateFirstRender: bool,
    /**
     * CSS classes to add to the transitioning element during the enter phase.
     */
    enter: string,
    /**
     * CSS classes to add to the transitioning element during the leave phase.
     */
    leave: string,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export const Transition = forwardRef(({
    show,
    animateFirstRender = false,
    enter,
    leave,
    as = "div",
    className,
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
            {...rest}
            onAnimationEnd={handleAnimationEnd}
            className={mergeClasses(
                show
                    ? isInitialRender ? animateFirstRender && enter : enter
                    : leave,
                className
            )}
            as={as}
            ref={ref}
        >
            {children}
        </Box>
    );
});

Transition.propTypes = propTypes;
