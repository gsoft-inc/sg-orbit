import { cloneElement } from "react";
import { getIconSizeForControl } from "./sizes";

export function createIconForControl(icon, size) {
    return cloneElement(icon, {
        size: getIconSizeForControl(size)
    });
}
