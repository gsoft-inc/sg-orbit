import { IconGallery } from "./icon-gallery";

export function createMultiVariant(previewIcon) {
    return {
        previewIcon
    };
}

export function renderItem(name, multiVariant) {
    return <IconGallery.Item name={name} multiVariant={multiVariant} />;
}
