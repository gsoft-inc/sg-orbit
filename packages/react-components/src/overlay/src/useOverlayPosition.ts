import { Instance, Placement, createPopper } from "@popperjs/core";
import { isNil, useMergedRefs, useRefState } from "../../shared";
import { useCallback } from "react";

export type OverlayPosition = Placement;

export interface UseOverlayPositionOptions {
    position?: OverlayPosition;
    offset?: number[];
    allowFlip?: boolean;
    allowPreventOverflow?: boolean;
    boundaryElement?: HTMLElement;
    hasArrow?: boolean;
}

export function useOverlayPosition({
    position = "bottom",
    offset,
    allowFlip = false,
    allowPreventOverflow = false,
    boundaryElement = document.body,
    hasArrow = false
}: UseOverlayPositionOptions = {}) {
    const [triggerRef, setTriggerElement] = useRefState<HTMLElement>();
    const [overlayRef, setOverlayElement] = useRefState<HTMLElement>();
    const [arrowRef, setArrowElement] = useRefState<HTMLElement>();
    const [popperInstanceRef, setPopperInstance] = useRefState<Instance>();

    const createModifiers = useCallback(() => {
        const modifiers = [];

        if (!isNil(offset)) {
            modifiers.push({
                name: "offset",
                options: {
                    offset
                }
            });
        }

        modifiers.push({
            name: "flip",
            enabled: allowFlip,
            options: {
                boundary: boundaryElement
            }
        });

        modifiers.push({
            name: "preventOverflow",
            enabled: allowPreventOverflow,
            options: {
                boundary: boundaryElement
            }
        });

        if (hasArrow) {
            modifiers.push({
                name: "arrow",
                options: {
                    element: arrowRef.current
                }
            });
        }

        return modifiers;
    }, [offset, allowFlip, allowPreventOverflow, boundaryElement, hasArrow, arrowRef]);

    const createPopperInstance = useCallback(() => {
        if (!isNil(triggerRef.current) && !isNil(overlayRef.current)) {
            if (!hasArrow || (hasArrow && !isNil(arrowRef.current))) {
                popperInstanceRef.current?.destroy();

                const instance = createPopper(triggerRef.current, overlayRef.current, {
                    strategy: "absolute",
                    placement: position,
                    modifiers: createModifiers()
                });

                setPopperInstance(instance);
            }
        }
    }, [position, hasArrow, triggerRef, overlayRef, arrowRef, popperInstanceRef, setPopperInstance, createModifiers]);

    return {
        triggerRef: useMergedRefs(useCallback((element: HTMLElement) => {
            setTriggerElement(element);
            createPopperInstance();
        }, [setTriggerElement, createPopperInstance])),
        overlayRef: useMergedRefs(useCallback((element: HTMLElement) => {
            setOverlayElement(element);
            createPopperInstance();
        }, [setOverlayElement, createPopperInstance])),
        arrowRef: useMergedRefs(useCallback((element: HTMLElement) => {
            setArrowElement(element);
            createPopperInstance();
        }, [setArrowElement, createPopperInstance]))
    };
}
