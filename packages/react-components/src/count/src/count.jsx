import "./count.css";

import { forwardRef } from "react";
import { mergeClasses } from "../../shared";
import { string } from "prop-types";

const propTypes = {
    /**
     * @ignore
     */
    className: string
};

export function PureCount({ className, children, forwardedRef, ...rest }) {
    const classes = mergeClasses(
        "o-ui count",
        className
    );

    return (
        <span {...rest} className={classes} ref={forwardedRef}>
            {children}
        </span>
    );
}

PureCount.propTypes = propTypes;

export const Count = forwardRef((props, ref) => (
    <PureCount { ...props } forwardedRef={ref} />
));
