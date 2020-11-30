import { DarkBackgroundColor, withCanvasContainer, withThemeProvider } from "./decorators";
import { Themes } from "./styles/themes";

/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
import "@orbit-ui/css-normalize";
import "@orbit-ui/fonts";
import "@orbit-ui/foundation";
import "@orbit-ui/react-components/dist/index.css";
import "@orbit-ui/semantic-ui-theme";
import "@orbit-ui/tachyons/dist/apricot.css";
/* eslint-enable sort-imports-es6-autofix/sort-imports-es6 */

import "./styles";

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
                "Chromatic"
            ]
        }
    },
    backgrounds: {
        default: "light",
        values: [
            {
                name: "light",
                value: "#FFFFFF"
            },
            {
                name: "dark",
                value: DarkBackgroundColor
            }
        ]
    },
    actions: {
        argTypesRegex: "^on[A-Z].*"
    },
    docs: {
        theme: Themes.docs,
        inlineStories: true,
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

export const decorators = [withThemeProvider, withCanvasContainer];
