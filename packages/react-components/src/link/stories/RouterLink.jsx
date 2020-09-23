import { forwardRef } from "react";

// Dummy component to demonstrate how to use with React Router.
export const RouterLink = forwardRef(({
    to,
    children,
    ...passthroughProps
}, ref) => {
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
            {...passthroughProps}
            href={to}
            ref={ref}
        >
            {children}
        </a>
    );
});
