import { IconItem } from "./IconItem";

export function createMultiVariant(icon) {
    return {
        icon
    };
}

export function createVariant(name, iconComponent, iconFileName) {
    return {
        name,
        iconComponent,
        iconFileName
    };
}

export function renderItem(name, multiVariant) {
    return <IconItem name={name} multiVariant={multiVariant} />;
}
