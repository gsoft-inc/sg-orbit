import "./Count.css";

import { createShorthandFactory, mergeClasses } from "../../shared";
import { forwardRef } from "react";

export function InnerCount({ className, children, forwardedRef, ...rest }) {
    return (
        <span
            {...rest}
            className={mergeClasses(
                "o-ui count",
                className
            )}
            ref={forwardedRef}
        >
            {children}
        </span>
    );
}

export const Count = forwardRef((props, ref) => (
    <InnerCount { ...props } forwardedRef={ref} />
));

export const createCount = createShorthandFactory(Count);
