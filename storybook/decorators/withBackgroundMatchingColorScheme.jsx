import { isNil } from "@components/shared";
import { useEffect } from "react";
import { useColorScheme } from "../addons/colorScheme";

const StyleElementId = "story-background-color";

const BackgroundColors = {
    light: "#FFFFFF",
    dark: "#272626"
};

export function withBackgroundMatchingColorScheme(story, context) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const colorScheme = useColorScheme();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const css = `
            .sb-show-main,
            .docs-story {
                background: ${BackgroundColors[colorScheme]} !important;
                transition: background-color 0.3s;
            }
        `;

        const styleElement = document.getElementById(StyleElementId);

        if (!isNil(styleElement)) {
            if (styleElement.innerHTML !== css) {
                styleElement.innerHTML = css;
            }
        } else {
            const style = document.createElement("style");
            style.setAttribute("id", StyleElementId);
            style.innerHTML = css;

            document.head.appendChild(style);
        }
    }, [colorScheme, context]);

    return story();
}
