import { IconGallery } from "./icon-gallery";

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
    return <IconGallery.Item name={name} multiVariant={multiVariant} variants={variants} />;
}
