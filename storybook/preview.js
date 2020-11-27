import { Themes } from "./styles/themes";
import { withCanvasContainer } from "./decorators";

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

export const decorators = [withCanvasContainer];
