import { arrayify, useEventCallback, useResizeObserver } from "../../shared";
import { useState } from "react";
import type { ResizeRef } from "../../shared";

export interface UseTriggerWidthOptions {
    isDisabled?: boolean;
}

export function useTriggerWidth({ isDisabled }: UseTriggerWidthOptions = {}): [ResizeRef, string] {
    const [triggerWidth, setTriggerWidth] = useState<string>();

    const handleResize = useEventCallback(entry => {
        setTriggerWidth(`${arrayify(entry.borderBoxSize)[0].inlineSize}px`);
    });

    const resizeRef = useResizeObserver(handleResize, {
        isDisabled,
        box: "border-box"
    });

    return [resizeRef, triggerWidth];
}
