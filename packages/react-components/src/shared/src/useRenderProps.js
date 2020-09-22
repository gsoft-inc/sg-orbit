import { isFunction } from "lodash";

export function useRenderProps(state, props, children) {
    return isFunction(children)
        ? children(state, props)
        : children;
}
