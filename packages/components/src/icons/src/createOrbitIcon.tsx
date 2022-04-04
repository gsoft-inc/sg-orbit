import { ElementType } from "react";
import { createIcon } from "./Icon";
import { createMultiVariantIcon } from "./MultiVariantIcon";

// TODO: I dont think we need to provide a "displayName" since the following release https://github.com/styleguidist/react-docgen-typescript/releases/tag/v2.1.0.
export function createOrbitIcon(src: ElementType, displayName: string) {
    const Component = createIcon(src);
    Component.displayName = displayName;

    return Component;
}

export function createOrbitMultiVariantIcon(src24: ElementType, src32: ElementType, displayName: string) {
    const Component = createMultiVariantIcon(src24, src32);
    Component.displayName = displayName;

    return Component;
}
