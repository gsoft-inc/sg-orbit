import "./count.css";

import { forwardRef } from "react";
import { mergeClasses } from "../../shared";
import { string } from "prop-types";

const propTypes = {
    className: string
};

export function PureCount({ className, children, forwardedRef, ...rest }) {
    const classes = mergeClasses(
        "count",
        className
    );

    return (
        <span className={classes} ref={forwardedRef} {...rest}>
            {children}
        </span>
    );
}

PureCount.propTypes = propTypes;

export const Count = forwardRef((props, ref) => (
    <PureCount { ...props } forwardedRef={ref} />
));
