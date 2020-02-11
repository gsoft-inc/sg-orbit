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

export function renderItem(name, Icon) {
    return (
        <IconGallery.Item name={name}>
            <Icon />
        </IconGallery.Item>
    );
}
