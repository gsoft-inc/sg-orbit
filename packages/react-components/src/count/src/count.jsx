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

export function InnerCount({ className, children, forwardedRef, ...rest }) {
    const classes = mergeClasses(
        "o-ui count",
        className
    );

    return (
        <span
            {...rest}
            className={classes}
            ref={forwardedRef}
        >
            {children}
        </span>
    );
}

InnerCount.propTypes = propTypes;

export const Count = forwardRef((props, ref) => (
    <InnerCount { ...props } forwardedRef={ref} />
));
