import { isNil } from "../../shared";

export function isTargetParent(target: EventTarget, element: HTMLElement) {
    // Must validate that "target" is a DOM element because it could be anything like "window".
    return target instanceof Element && !isNil(element) && element.contains(target);
}
