import { ElementType } from "react";
import { createIcon } from "./Icon";

// TODO: I dont think we need to provide a "displayName" since the following release https://github.com/styleguidist/react-docgen-typescript/releases/tag/v2.1.0.
export function createOrbitIcon(src: ElementType, displayName: string) {
    const Component = createIcon(src);
    Component.displayName = displayName;

    return Component;
}
