import "./Count.css";

import { createShorthandFactory, mergeClasses } from "../../shared";
import { forwardRef } from "react";
import { isString } from "lodash";

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

export const createCount = createShorthandFactory(Count, (shorthand, props) => {
    if (isString(shorthand)) {
        return (
            <Count {...props}>
                {shorthand}
            </Count>
        );
    }
});
