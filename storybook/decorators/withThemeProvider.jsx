import { ThemeProvider } from "@react-components/theme-provider";
import { isNil } from "lodash";
import { useEffect } from "react";

export const DarkBackgroundColor = "#2B2F3B";

function useStoryContainerMatchingColorScheme(colorScheme, context) {
    useEffect(() => {
        const styleElementId = context.viewMode === "docs"
            ? `addon-backgrounds-docs-${context.id}`
            : "addon-backgrounds-color";

        const storyContainerId = context.viewMode === "docs" ? ".docs-story" : ".sb-show-main";

        const css = `
            ${storyContainerId} {
                background: ${colorScheme === "dark" ? DarkBackgroundColor : "#FFF"} !important;
                transition: background-color 0.3s;
            }
        `;

        const styleElement = document.getElementById(styleElementId);

        if (!isNil(styleElement)) {
            if (styleElement.innerHTML !== css) {
                styleElement.innerHTML = css;
            }
        } else {
            const style = document.createElement("style");
            style.setAttribute("id", styleElementId);
            style.innerHTML = css;

            document.head.appendChild(style);
        }
    }, [colorScheme, context]);
}

export function withThemeProvider(Story, context) {
    const theme = context.globals.theme;
    const colorScheme = context.globals.colorScheme;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useStoryContainerMatchingColorScheme(colorScheme, context);

    return (
        <ThemeProvider theme={theme} colorScheme={colorScheme}>
            <Story {...context} />
        </ThemeProvider>
    );
}
