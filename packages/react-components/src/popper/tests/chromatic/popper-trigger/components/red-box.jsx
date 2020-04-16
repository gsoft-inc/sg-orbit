import { forwardRef } from "react";

function InnerRedBox({ forwardedRef, ...rest }) {
    return (
        <div
            className="w12 h12 bg-red"
            tabIndex="0"
            ref={forwardedRef}
            {...rest}
        >
        </div>
    );
}

export const RedBox = forwardRef((props, ref) => (
    <InnerRedBox { ...props } forwardedRef={ref} />
));
