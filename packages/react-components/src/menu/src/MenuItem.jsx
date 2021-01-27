/*
To facilitate TS typings maybe an Item could have a button or link as child:
<Menu
    <Item>
        <a>Google</a>
    </Item>
    <Item>
        <button>Add</button>
    </Item>
</Menu> -> NOPE COMPLIQUÉ ENSUITE POUR TOOLTIP, ICON, DESC

- Support command?
- aria-labelledby si fait <li><a>text</a></li>
*/

import { Box } from "../../box";
import { forwardRef } from "react";
import { mergeProps } from "../../shared";

const propTypes = {

};

export function InnerMenuItem({ children, ...rest }) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: "o-ui-menu-item",
                    role: "menuitem"
                }
            )}
        >
            {children}
        </Box>
    );
}

InnerMenuItem.propTypes = propTypes;

export const MenuItem = forwardRef((props, ref) => (
    <InnerMenuItem {...props} forwardedRef={ref} />
));

MenuItem.displayName = "MenuItem";

