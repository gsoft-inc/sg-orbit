import { RefCallback, useState } from "react";
import { arrayify, useEventCallback, useResizeObserver } from "../../shared";

export interface UseTriggerWidthOptions {
    isDisabled?: boolean;
}

export function useTriggerWidth({ isDisabled }: UseTriggerWidthOptions = {}): [RefCallback<HTMLElement>, string] {
    const [triggerWidth, setTriggerWidth] = useState<string>();

    const handleResize = useEventCallback(entry => {
        setTriggerWidth(`${arrayify(entry.borderBoxSize)[0].inlineSize}px`);
    });

    const resizeRef = useResizeObserver(handleResize, {
        box: "border-box",
        isDisabled
    });

    return [resizeRef, triggerWidth];
}
