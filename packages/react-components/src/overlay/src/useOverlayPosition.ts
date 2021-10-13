import { Instance, Placement, createPopper } from "@popperjs/core";
import { ResponsiveProp } from "../../styling";
import { isNil, useMergedRefs, useRefState } from "../../shared";
import { useCallback } from "react";

export type OverlayPosition = Placement;

export type OverlayPositionProp = ResponsiveProp<OverlayPosition>;

export interface UseOverlayPositionOptions {
    allowFlip?: boolean;
    allowPreventOverflow?: boolean;
    boundaryElement?: HTMLElement;
    hasArrow?: boolean;
    offset?: number[];
    position?: OverlayPosition;
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
            enabled: allowFlip,
            name: "flip",
            options: {
                boundary: boundaryElement
            }
        });

        modifiers.push({
            enabled: allowPreventOverflow,
            name: "preventOverflow",
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
                    modifiers: createModifiers(),
                    placement: position,
                    strategy: "absolute"
                });

                setPopperInstance(instance);
            }
        }
    }, [position, hasArrow, triggerRef, overlayRef, arrowRef, popperInstanceRef, setPopperInstance, createModifiers]);

    return {
        arrowRef: useMergedRefs(useCallback((element: HTMLElement) => {
            setArrowElement(element);
            createPopperInstance();
        }, [setArrowElement, createPopperInstance])),
        overlayRef: useMergedRefs(useCallback((element: HTMLElement) => {
            setOverlayElement(element);
            createPopperInstance();
        }, [setOverlayElement, createPopperInstance])),
        triggerRef: useMergedRefs(useCallback((element: HTMLElement) => {
            setTriggerElement(element);
            createPopperInstance();
        }, [setTriggerElement, createPopperInstance]))
    };
}
