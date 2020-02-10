import { cloneElement } from "react";
import { mergeClasses } from "@orbit-ui/react-components-shared";

export function createIconFromExisting(icon, size) {
    console.log("In createIconFromExisting", size);

    return cloneElement(icon, {
        size,
        className: mergeClasses(
            "icon",
            icon.props && icon.props.className
        )
    });
}
