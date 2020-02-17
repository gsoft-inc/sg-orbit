import { cloneElement } from "react";
import { getIconSizeForControl } from "./sizes";
import { isFunction } from "lodash";

function ensureIsKnownIconWrapper(icon) {
    if (isFunction(icon.type)) {
        const asString = icon.type.toString();

        if (asString.includes("Icon") || asString.includes("MultiVariantIcon")) {
            return true;
        }
    }

    throw new Error("Unknown icon wrapper. Custom icons must be wrapped in an <Icon /> or <MultiVariantIcon /> component.");
}

export function createIconForControl(icon, size) {
    ensureIsKnownIconWrapper(icon);

    return cloneElement(icon, {
        size: getIconSizeForControl(size)
    });
}
