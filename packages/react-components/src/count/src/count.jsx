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

function useRenderer({ className, children, forwardedRef, rest }) {
    return () => {
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
    };
}

export function PureCount({ className, children, forwardedRef, ...rest }) {
    const render = useRenderer({ className, children, forwardedRef, rest });

    return render();
}

PureCount.propTypes = propTypes;

export const Count = forwardRef((props, ref) => (
    <PureCount { ...props } forwardedRef={ref} />
));
