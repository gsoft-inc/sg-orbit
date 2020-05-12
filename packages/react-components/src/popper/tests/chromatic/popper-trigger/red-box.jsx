import { forwardRef } from "react";

function InnerRedBox({ forwardedRef, ...rest }) {
    return (
        <div
            className="w12 h12 pa2 bg-red"
            ref={forwardedRef}
            {...rest}
        >
            <a href="https://en.wikipedia.org/wiki/David_Saint-Jacques" target="__blank">David Saint-Jacques</a>
        </div>
    );
}

export const RedBox = forwardRef((props, ref) => (
    <InnerRedBox { ...props } forwardedRef={ref} />
));
