import { forwardRef } from "react";

const propTypes = {

};

const defaultProps = {

};

export function InnerLozenge() {

}

InnerLozenge.propTypes = propTypes;
InnerLozenge.defaultProps = defaultProps;

export const Lozenge = forwardRef((props, ref) => (
    <InnerLozenge { ...props } forwardedRef={ref} />
));
