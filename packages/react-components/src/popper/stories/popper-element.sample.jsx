import { forwardRef } from "react";

export const PopperElement = forwardRef((props, ref) => (
    <div
        {...props}
        className="bg-primary-300 white pa2"
        ref={ref}
    >
        A comet is an icy, small Solar System body.
    </div>
));
