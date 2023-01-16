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

export function renderItem(name, multiVariant, variants) {
    return <IconItem name={name} multiVariant={multiVariant} variants={variants} />;
}
