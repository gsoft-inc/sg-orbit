import { Placement, createPopper } from "@popperjs/core";
import { isNil, useMergedRefs, useRefState } from "../../shared";
import { useCallback, useMemo } from "react";

export type OverlayPosition = Placement;

export interface UseOverlayPositionOptions {
    arrowElement?: HTMLElement;
    position?: OverlayPosition;
    offset?: number[];
    allowFlip?: boolean;
    allowPreventOverflow?: boolean;
    boundaryElement?: HTMLElement;
}

export function useOverlayPosition({
    arrowElement,
    position = "bottom",
    offset,
    allowFlip = false,
    allowPreventOverflow = false,
    boundaryElement = document.body
}: UseOverlayPositionOptions = {}) {
    const [triggerRef, setTriggerElement] = useRefState<HTMLElement>();
    const [overlayRef, setOverlayElement] = useRefState<HTMLElement>();
    const [popperInstanceRef, setPopperInstance] = useRefState();

    const offsetModifier = useMemo(() => ({
        name: "offset",
        options: {
            offset
        }
    }), [offset]);

    const flipModifier = useMemo(() => ({
        name: "flip",
        enabled: allowFlip,
        options: {
            boundary: boundaryElement
        }
    }), [allowFlip, boundaryElement]);

    const preventOverflowModifier = useMemo(() => ({
        name: "preventOverflow",
        enabled: allowPreventOverflow,
        options: {
            boundary: boundaryElement
        }
    }), [allowPreventOverflow, boundaryElement]);

    const arrowModifier = useMemo(() => ({
        name: "arrow",
        options: {
            element: arrowElement
        }
    }), [arrowElement]);

    const modifiers = useMemo(() => [
        offsetModifier,
        flipModifier,
        preventOverflowModifier,
        arrowModifier
    ], [offsetModifier, flipModifier, preventOverflowModifier, arrowModifier]);

    const createPopperInstance = useCallback(() => {
        if (!isNil(triggerRef.current) && !isNil(overlayRef.current)) {
            // @ts-ignore
            popperInstanceRef.current?.destroy();

            const instance = createPopper(triggerRef.current, overlayRef.current, {
                strategy: "absolute",
                placement: position,
                modifiers
            });

            setPopperInstance(instance);
        }
    }, [position, modifiers, triggerRef, overlayRef, popperInstanceRef, setPopperInstance]);

    const setTrigger = useCallback(element => {
        setTriggerElement(element);
        createPopperInstance();
    }, [setTriggerElement, createPopperInstance]);

    const setOverlay = useCallback(element => {
        setOverlayElement(element);
        createPopperInstance();
    }, [setOverlayElement, createPopperInstance]);

    return {
        triggerRef: useMergedRefs(setTrigger),
        overlayRef: useMergedRefs(setOverlay)
    };
}
