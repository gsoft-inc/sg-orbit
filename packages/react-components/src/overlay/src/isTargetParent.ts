import { RefObject } from "react";
import { isNil } from "../../shared";

// export function isTargetParent(target: EventTarget, element: HTMLElement) {
export function isTargetParent(target: EventTarget, parentRef: RefObject<HTMLElement>) {
    // Must validate that "target" is a DOM element because it could be anything like "window".
    return target instanceof Element && parentRef.current?.contains(target);
}
