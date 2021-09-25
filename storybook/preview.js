import { ApricotTheme, DesktopTheme, createCss } from "@orbit-ui/styles";
import { Code } from "@stories/mdx";
import { Themes } from "./styles/themes";
import { isChromatic, isDocs } from "./env";
import { withBackgroundMatchingColorScheme, withCenteredCanvas, withDocsContainer, withThemeProvider } from "./decorators";

import "@orbit-ui/react-components/dist/index.css";
import "@orbit-ui/styles/dist/index.css";

import "./styles";

createCss([ApricotTheme, DesktopTheme]);

// TODO: Need to do something for this
// if (!isChromatic) {
//     // Custom font makes chromatic inconsistent and cause "false positive". View https://www.chromatic.com/docs/resource-loading#loading-custom-fonts.
//     import("@orbit-ui/fonts");
// }

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
