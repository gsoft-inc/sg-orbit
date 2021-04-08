import { Code } from "@stories/mdx";
import { Themes } from "./styles/themes";
import { isChromatic } from "./env";
import { withBackgroundMatchingColorScheme, withCenteredCanvas, withDocsContainer, withThemeProvider } from "./decorators";

/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
import "@orbit-ui/css-normalize";
import "@orbit-ui/foundation";
import "@orbit-ui/react-components/dist/index.css";
import "@orbit-ui/tachyons";
/* eslint-enable sort-imports-es6-autofix/sort-imports-es6 */

import "./styles";

if (!isChromatic) {
    // Custom font makes chromatic inconsistent and cause "false positive". View https://www.chromatic.com/docs/resource-loading#loading-custom-fonts.
    import("@orbit-ui/fonts");
}

export const parameters = {
    options: {
        storySort: {
            method: "alphabetical",
            order: [
                "Getting Started",
                ["Packages", "Installation", "Foundation", "Tachyons", "Slots", "Supported Platforms", "Contributing"],
                "Materials",
                ["Borders", "Colors", "Flexbox", "Grid", "Icons", "Shadows", "Spacing", "Typography"],
                "Components",
                "Placeholders",
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
    }
};

export const globalTypes = {
    theme: {
        name: "Theme",
        description: "Orbit UI theme for components",
        defaultValue: "apricot",
        toolbar: {
            icon: "photo",
            items: ["apricot", "overcast", "desktop"]
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
