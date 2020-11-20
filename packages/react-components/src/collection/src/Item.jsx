import { any, bool } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * Whether or not the item is disabled.
     */
    disabled: bool,
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerItem() {
    return null;
}

InnerItem.propTypes = propTypes;

export const Item = forwardRef((props, ref) => (
    <InnerItem {...props} forwardedRef={ref} />
));
