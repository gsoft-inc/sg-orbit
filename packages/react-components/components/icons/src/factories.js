import { ArgumentError } from "@orbit-ui/react-components-shared";
import { cloneElement } from "react";
import { getIconSizeForControl } from "./sizes";
import { isForwardRef } from "react-is";
import { isFunction } from "lodash";

function isFunctionCreatingAnIconElement(fct) {
    const asString = fct.toString();

    return asString.includes("createElement(Icon") ||
           asString.includes(".Icon") ||
           asString.includes("createElement(PureIcon") ||
           asString.includes(".PureIcon") ||
           asString.includes("createElement(MultiVariantIcon") ||
           asString.includes(".MultiVariantIcon") ||
           asString.includes("createElement(PureMultiVariantIcon") ||
           asString.includes(".PureMultiVariantIcon");
}

function ensureIsKnownIconWrapper(icon) {
    if (isForwardRef(icon)) {
        if (isFunctionCreatingAnIconElement(icon.type.render)) {
            return true;
        }
    }
    else if (isFunction(icon.type)) {
        if (isFunctionCreatingAnIconElement(icon.type)) {
            return true;
        }
    }

    throw new ArgumentError("Unknown icon wrapper. Custom icons must be wrapped in an <Icon /> or <MultiVariantIcon /> component.");
}

export function createIconForControl(icon, size) {
    ensureIsKnownIconWrapper(icon);

    return cloneElement(icon, {
        size: getIconSizeForControl(size)
    });
}
