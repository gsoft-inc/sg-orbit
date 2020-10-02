import { any, bool, elementType, oneOfType, string } from "prop-types";
import { forwardRef, useEffect, useState } from "react";
import { mergeClasses, useEventCallback } from "../../shared";

/*
TODO:
- add appear
*/

const propTypes = {
    /**
     * A controlled show value that determined whether or not the component is displayed.
     */
    show: bool.isRequired,
    /**
     * CSS classes for enter animation.
     */
    enter: string,
    /**
     * CSS classes for leave animation.
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
    enter,
    leave,
    as: ElementType = "div",
    className,
    children,
    ...rest
}, ref) => {
    const [isVisible, setIsVisible] = useState(show);

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
                show ? enter : leave,
                className
            )}
            ref={ref}
        >
            {children}
        </ElementType>
    );
});

Transition.propTypes = propTypes;
