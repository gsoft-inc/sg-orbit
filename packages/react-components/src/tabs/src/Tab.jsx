import { any, bool } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * Whether or not the tab is disabled.
     */
    disabled: bool,
    /**
     * React children
     */
    children: any.isRequired
};

export function InnerTab() {
    return null;
}

InnerTab.propTypes = propTypes;

export const Tab = forwardRef((props, ref) => (
    <InnerTab {...props} forwardedRef={ref} />
));
