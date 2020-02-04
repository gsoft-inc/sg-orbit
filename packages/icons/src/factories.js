import { cloneElement } from "react";
import { mergeClasses } from "@orbit-ui/react-components-shared";

export function createIconFromExisting(icon) {
    return cloneElement(icon, {
        className: mergeClasses(
            "icon",
            icon.props && icon.props.className
        )
    });
}
