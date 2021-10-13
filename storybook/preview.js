import { ApricotTheme, DesktopTheme, createThemeVars } from "@react-components/styling";
import { Code } from "@stories/mdx";
import { Themes } from "./styles/themes";
import { isChromatic, isDocs } from "./env";
import { withBackgroundMatchingColorScheme, withCenteredCanvas, withDocsContainer, withThemeProvider } from "./decorators";

/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
import "@react-components/styling/src/normalize.css";
import "@react-components/styling/src/vars.css";
import "@react-components/styling/src/animate.css";
import "@react-components/styling/src/styled-system/index.css";
/* eslint-enable sort-imports-es6-autofix/sort-imports-es6 */

import "./styles";

createThemeVars([ApricotTheme, DesktopTheme]);

if (!isChromatic) {
    // Custom font makes chromatic inconsistent and cause "false positive". View https://www.chromatic.com/docs/resource-loading#loading-custom-fonts.
    import("@react-components/styling/src/font/index.css");
}

export const parameters = {
    options: {
        storySort: {
            method: "alphabetical",
            order: [
                "Getting Started",
                ["Packages", "Installation", "Styling", "Slots", "As", "Supported Platforms", "Contributing"],
                "Materials",
                ["Colors", "Icons", "Shadows", "Spacing", "Typography", "Motion"],
                "Layout",
                "Components",
                "Content",
                "Placeholders",
                "Collection",
                "Html elements",
                "Chromatic"
            ]
        }
    },
    docs: {
        theme: Themes.docs,
        inlineStories: true,
        components: {
            code: Code
        },
        container: ({ context, children }) => withDocsContainer(context, children),
        // Disable DocsPage feature.
        page: null
    },
    a11y: {
        config: {
            rules: [
                { id: "button-name", enabled: false }
            ]
        }
    },
    viewport: {
        viewports: {
            m: {
                name: "medium (900px)",
                styles: {
                    width: "900px",
                    height: "100%"
                }
            },
            l: {
                name: "large (1280px)",
                styles: {
                    width: "1280px",
                    height: "100%"
                }
            }
        }
    }
};

// HACKS: temporary hacks until SB natively support tools with docs mode.
if (isDocs) {
    parameters.options.initialActive = "docs";
    parameters.options.isToolshown = true;
}

export const globalTypes = {
    theme: {
        name: "Theme",
        description: "Orbit UI theme for components",
        defaultValue: ApricotTheme.name,
        toolbar: {
            icon: "photo",
            items: [ApricotTheme.name, DesktopTheme.name]
        }
    },
    colorScheme: {
        name: "ColorScheme",
        description: "Orbit UI color scheme for components",
        defaultValue: "light",
        toolbar: {
            icon: "mirror",
            items: ["light", "dark"]
        }
    }
};

export const decorators = [withCenteredCanvas, withThemeProvider, withBackgroundMatchingColorScheme];
