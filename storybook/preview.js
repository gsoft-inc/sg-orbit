import "@css/normalize.css";
import "@components/index.css";
import "@experimental-components/index.css";
import "./styles";

import { ShareGateTheme, createThemeVars } from "@components/styling";
import { isChromatic, isDocs } from "./env";
import { withBackgroundMatchingColorScheme, withCenteredCanvas, withDocsContainer, withThemeProvider } from "./decorators";

import { Code, Highlight } from "@stories/mdx";
import { Themes } from "./styles/themes";

createThemeVars([ShareGateTheme]);

if (!isChromatic) {
    // Custom font makes chromatic inconsistent and cause "false positive". View https://www.chromatic.com/docs/resource-loading#loading-custom-fonts.
    import("@css/font/index.css");
}

export const parameters = {
    options: {
        storySort: {
            method: "alphabetical",
            order: [
                "Installation",
                "Platforms",
                "Features", [
                    "Style props",
                    "Responsive styles",
                    "Theming",
                    "Color schemes",
                    "Slots",
                    "As"
                ],
                "Materials", [
                    "Icons",
                    "Motion"
                ],
                "Layout",
                "Components",
                "Content",
                "Placeholders",
                "Html elements",
                "Chromatic"
            ]
        }
    },
    docs: {
        theme: Themes.docs,
        inlineStories: true,
        components: {
            blockquote: Highlight,
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
            xs: {
                name: "xs (640px)",
                styles: {
                    width: "640px",
                    height: "100%"
                }
            },
            sm: {
                name: "sm (768px)",
                styles: {
                    width: "768px",
                    height: "100%"
                }
            },
            md: {
                name: "md (1024px)",
                styles: {
                    width: "1024px",
                    height: "100%"
                }
            },
            lg: {
                name: "lg (1280px)",
                styles: {
                    width: "1280px",
                    height: "100%"
                }
            },
            xl: {
                name: "xl (1536px)",
                styles: {
                    width: "1536px",
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
    colorScheme: {
        name: "ColorScheme",
        description: "Color scheme for components",
        defaultValue: "light",
        toolbar: {
            title: "Color Scheme",
            items: ["light", "dark"]
        }
    }
};

export const decorators = [withCenteredCanvas, withThemeProvider, withBackgroundMatchingColorScheme];
