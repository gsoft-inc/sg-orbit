import { isFunction } from "lodash";

export function useRenderProps(context, props, children) {
    return isFunction(children)
        ? children(context, props)
        : children;
}
