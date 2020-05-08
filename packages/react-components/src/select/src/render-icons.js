import { createIconForControl } from "../../icons";

export function renderIcons(icons, size, ...rest) {
    return () => {
        const normalizedIcons = Array.isArray(icons) ? icons : [icons];

        return (
            <span {...rest}>
                {normalizedIcons.map((x, index) => createIconForControl(x, size, { key: index }))}
            </span>
        );
    };
}
