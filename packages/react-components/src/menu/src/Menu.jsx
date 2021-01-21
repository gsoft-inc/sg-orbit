import "./Menu.css";

import { Box } from "../../box";
import { forwardRef } from "react";
import { mergeProps } from "../../shared";

/*
TODO:
    - orientation
    - aria-label | aria-labelledby
    - use UL / LI
*/

const propTypes = {

};

export function InnerMenu({
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    role: "menu",
                    tabIndex: "-1",
                    "aria-orientation": "vertical",
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

InnerMenu.propTypes = propTypes;

export const Menu = forwardRef((props, ref) => (
    <InnerMenu {...props} forwardedRef={ref} />
));

Menu.displayName = "Menu";
