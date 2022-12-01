import { isNil } from "@components/shared";
import { useEffect } from "react";

import { getGlobals } from "../utils";

const StyleElementId = "story-background-color";

const BackgroundColors = {
    light: "#F9F9F9",
    dark: "#111010"
};

export function withBackgroundMatchingColorScheme(story, context) {
    const { colorScheme } = getGlobals(context);

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
