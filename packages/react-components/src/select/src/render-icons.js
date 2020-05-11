import { createContentIcon } from "../../icons";

export function renderIcons(icons, size) {
    const normalizedIcons = Array.isArray(icons) ? icons : [icons];

    return (
        <>
            {normalizedIcons.map((x, index) => createContentIcon(x, size, { key: index }))}
        </>
    );
}
