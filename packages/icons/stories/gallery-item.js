import { IconGallery } from "storybook-icon-gallery";

export function getDisplayName({ name }) {
    return name.split(/(?=[A-Z])/)
        .filter(x => x !== "Icon")
        .join(" ")
        .toLowerCase();
}

export function getItemCopyValue({ name, size }) {
    if (size === 24) {
        return `${name}${size}`;
    }

    return name;
}

export function renderItem(name, Icon24, Icon32) {
    return (
        <IconGallery.Variants name={name}>
            <IconGallery.Variant size={24}>
                {Icon24 && <Icon24 />}
            </IconGallery.Variant>
            <IconGallery.Variant size={32}>
                {Icon32 && <Icon32 />}
            </IconGallery.Variant>
        </IconGallery.Variants>
    );
}
