import { Box } from "@react-components/box";
import { as } from "@react-components/shared";
import { forwardRef } from "react";

const A = as(Box, "as");

// Dummy component to demonstrate how to use with React Router.
export const RouterLink = forwardRef(({
    to,
    children,
    ...rest
}, ref) => {
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <A
            {...rest}
            href={to}
            ref={ref}
        >
            {children}
        </A>
    );
});
