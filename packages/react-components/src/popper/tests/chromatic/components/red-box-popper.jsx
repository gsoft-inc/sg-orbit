import { Button } from "@react-components/button";
import { Popper } from "@react-components/popper";
import { forwardRef } from "react";

function PureRedBox({ forwardedRef, ...rest }) {
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

const RedBox = forwardRef((props, ref) => (
    <PureRedBox { ...props } forwardedRef={ref} />
));

export function RedBoxPopper(rest) {
    return (
        <Popper
            trigger={<Button fluid>Open</Button>}
            {...rest}
        >
            <RedBox />
        </Popper>
    );
}


