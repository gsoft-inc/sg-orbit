import { cloneElement } from "react";
import { getIconSizeForCompactControl, getIconSizeForControl } from "./sizes";

export function createIconForControl(icon, size, props = {}) {
    return cloneElement(icon, {
        size: getIconSizeForControl(size),
        ...props
    });
}

export function createCompactIconForControl(icon, size, props = {}) {
    return cloneElement(icon, {
        size: getIconSizeForCompactControl(size),
        ...props
    });
}
