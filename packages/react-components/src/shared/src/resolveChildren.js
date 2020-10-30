import { Fragment } from "react";
import { isFunction, isNil } from "lodash";

// Support first level fragment: https://github.com/facebook/react/issues/11859.
export function resolveFragment(children) {
    if (!isNil(children) && children.type === Fragment) {
        return children.props.children;
    }

    return children;
}

export function resolveChildren(children, renderProps) {
    if (isFunction(children)) {
        return resolveFragment(children(renderProps));
    }

    return resolveFragment(children);
}
