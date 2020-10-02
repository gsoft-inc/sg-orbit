import { any, bool, elementType, oneOfType, string } from "prop-types";
import { forwardRef, useEffect, useRef, useState } from "react";
import { mergeClasses, useEventCallback } from "../../shared";

function useIsInitialRender() {
    const initial = useRef(true);

    useEffect(() => {
        initial.current = false;
    }, []);

    return initial.current;
}

const propTypes = {
    /**
     * A controlled show value that determined whether or not the component is displayed.
     */
    show: bool.isRequired,
    /**
     * 	Whether the transition should run on initial mount.
     */
    appear: bool,
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
    appear = false,
    enter,
    leave,
    as: ElementType = "div",
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

    const handleAnimationStart = useEventCallback(() => {
    });

    const handleAnimationEnd = useEventCallback(() => {
        setIsVisible(show);
    });

    if (!isVisible) {
        return null;
    }

    return (
        <ElementType
            {...rest}
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
            className={mergeClasses(
                show
                    ? isInitialRender ? appear && enter : enter
                    : leave,
                className
            )}
            ref={ref}
        >
            {children}
        </ElementType>
    );
});

Transition.propTypes = propTypes;
