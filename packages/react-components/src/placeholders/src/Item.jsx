/* eslint-disable react/no-unused-prop-types */

import { any, bool, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * A unique key to identify the item.
     */
    key: string,
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

Item.displayName = "Item";
