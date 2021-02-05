export function isTargetParent(element, target) {
    // Must validate that "target" is a DOM element because it could be anything like "window".
    return target instanceof Element && element.contains(target);
}
