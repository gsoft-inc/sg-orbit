/* eslint-disable react/no-unused-prop-types */

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
    // When returning null, react-docgen doesn't ignore the component.
    return <></>;
}

InnerItem.propTypes = propTypes;

export const Item = forwardRef((props, ref) => (
    <InnerItem {...props} forwardedRef={ref} />
));
