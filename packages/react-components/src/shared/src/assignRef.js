import { isFunction, isNil } from "lodash";

export function assignRef(ref, node) {
    if (!isNil(ref)) {
        if (isFunction(ref)) {
            ref(node);
        } else {
            ref.current = node;
        }
    }
}
