import { Button } from "@react-components/button";
import { Popper } from "@react-components/popper";
import { forwardRef, useState } from "react";
import { isNil } from "lodash";

export const RedBox = forwardRef((props, ref) => {
    return (
        <div
            {...props}
            className="w12 h12 bg-red"
            tabIndex="0"
            ref={ref}
        >
        </div>
    );
});

export const RedBoxPopper = forwardRef(({ defaultShow, ...rest }, ref) => {
    const [triggerElement, setTriggerElement] = useState();
    const [isVisible, setVisibility] = useState(defaultShow);

    return (
        <>
            <Button
                fluid
                onClick={() => setVisibility(!isVisible)}
                ref={setTriggerElement}
            >
                Open
            </Button>
            <If condition={!isNil(triggerElement)}>
                <Popper
                    show={isVisible}
                    triggerElement={triggerElement}
                    ref={ref}
                    {...rest}
                >
                    <RedBox />
                </Popper>
            </If>
        </>
    );
});


