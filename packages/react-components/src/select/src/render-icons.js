import { createIconForControl } from "../../icons";

export function renderIcons(icons, size) {
    const normalizedIcons = Array.isArray(icons) ? icons : [icons];

    return (
        <>
            {normalizedIcons.map((x, index) => createIconForControl(x, size, { key: index }))}
        </>
    );
}
