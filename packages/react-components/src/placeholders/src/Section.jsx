/* eslint-disable react/no-unused-prop-types */

import { any } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerSection() {
    // When returning null, react-docgen doesn't ignore the component.
    return <></>;
}

InnerSection.propTypes = propTypes;

export const Section = forwardRef((props, ref) => (
    <InnerSection {...props} forwardedRef={ref} />
));

Section.displayName = "Section";
