import { cloneElement } from "react";
import { mergeClasses } from "@orbit-ui/react-components-shared";

export function createIconFromExisting(icon, size) {
    return cloneElement(icon, {
        size,
        className: mergeClasses(
            "icon",
            icon.props && icon.props.className
        )
    });
}
