import { arrayify, useEventCallback, useResizeObserver } from "../../shared";
import { useState } from "react";

export interface UseTriggerWidthProps {
    isDisabled?: boolean;
}

export function useTriggerWidth(triggerElement: Element, { isDisabled }: UseTriggerWidthProps = {}) {
    const [triggerWidth, setTriggerWidth] = useState<string>();

    const handleResize = useEventCallback(entry => {
        setTriggerWidth(`${arrayify(entry.borderBoxSize)[0].inlineSize}px`);
    });

    useResizeObserver(triggerElement, handleResize, {
        isDisabled,
        box: "border-box"
    });

    return triggerWidth;
}
