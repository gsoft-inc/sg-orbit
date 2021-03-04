import { arrayify, useEventCallback, useResizeObserver } from "../../shared";
import { useState } from "react";

export function useTriggerWidth(triggerElement, { isDisabled } = {}) {
    const [triggerWidth, setTriggerWidth] = useState();

    const handleResize = useEventCallback(entry => {
        setTriggerWidth(`${arrayify(entry.borderBoxSize)[0].inlineSize}px`);
    });

    useResizeObserver(triggerElement, handleResize, {
        isDisabled,
        box: "border-box"
    });

    return triggerWidth;
}
