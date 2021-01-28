/* eslint-disable react/no-unused-prop-types */

import { any, elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * The section name.
     */
    title: string,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
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
