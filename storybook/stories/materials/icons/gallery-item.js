import { IconGallery } from "@docs-blocks";

export function getDisplayName({ itemName }) {
    return itemName.split(/(?=[A-Z])/)
        .filter(x => x !== "Icon")
        .join(" ")
        .toLowerCase();
}

export function getItemCopyValue({ itemName, variantSize }) {
    if (variantSize === 24) {
        return `${itemName}${variantSize}`;
    }

    return itemName;
}

export function renderItem(name, Icon24, Icon32) {
    return (
        <IconGallery.Item name={name}>
            <IconGallery.Variant size={24}>
                {Icon24 && <Icon24 />}
            </IconGallery.Variant>
            <IconGallery.Variant size={32}>
                {Icon32 && <Icon32 />}
            </IconGallery.Variant>
        </IconGallery.Item>
    );
}
