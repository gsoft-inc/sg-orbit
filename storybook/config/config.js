/* eslint react/jsx-filename-extension: "off" */

import { DocsContainer, DocsPage } from "@storybook/addon-docs/blocks";
import { MODES, includeComponents, includeMaterials, includeTests, includeTheme, isChromatic, isDebug, mode, scope } from "./utils";
import { StoryContainer } from "./story-container";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { customStorybookTheme } from "./theme";
import { withConsole } from "@storybook/addon-console";

import "@orbit-ui/css-normalize";
import "@orbit-ui/icons";
import "@orbit-ui/semantic-ui-theme";
import "@orbit-ui/tachyons/dist/apricot.css";

if (isDebug) {
    console.log("IS CHROMATIC: ", isChromatic);
    console.log("INCLUDE TESTS: ", includeTests);
    console.log("MODE: ", mode);
    console.log("SCOPE: ", scope);
}

if (!isChromatic) {
    // Custom font makes chromatic inconsistent and cause "false positive".
    import("@orbit-ui/fonts");
    import("@orbit-ui/foundation/dist/desktop.css");
    import("@orbit-ui/foundation/dist/overcast.css");
    import("@orbit-ui/foundation/dist/apricot.css");
} else {
    // The custom brand picker cause a rendering delay that we don't want to handle in the stories for
    // performance reasons. To circonvent this problem, we statically load the apricot brand.
    import("@orbit-ui/foundation/dist/apricot.css");
}

import "./styles/components-presets.css";
import "./styles/stories.css";

addParameters({
    options: {
        theme: customStorybookTheme
    },
    docs: {
        inlineStories: true
    }
});

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addDecorator((storyFn, context) => <StoryContainer story={storyFn()} context={context} />);

let stories = [];

stories = [...stories, require.context("../../packages/react-components/components", true, /.stories.mdx$/)];

stories = [...stories, require.context("../../packages/react-components/components", true, /.chroma.jsx$/)];

configure(stories, module);


// import { DocsContainer, DocsPage } from "@storybook/addon-docs/blocks";
// import { MODES, includeComponents, includeMaterials, includeTests, includeTheme, isChromatic, isDebug, mode, scope } from "./utils";
// import { StoryContainer } from "./story-container";
// import { addDecorator, addParameters, configure } from "@storybook/react";
// import { customStorybookTheme } from "./theme";
// import { withConsole } from "@storybook/addon-console";

// import "@orbit-ui/css-normalize";
// import "@orbit-ui/icons";
// import "@orbit-ui/semantic-ui-theme";
// import "@orbit-ui/tachyons/dist/apricot.css";

// if (isDebug) {
//     console.log("IS CHROMATIC: ", isChromatic);
//     console.log("INCLUDE TESTS: ", includeTests);
//     console.log("MODE: ", mode);
//     console.log("SCOPE: ", scope);
// }

// if (!isChromatic) {
//     // Custom font makes chromatic inconsistent and cause "false positive".
//     import("@orbit-ui/fonts");
//     import("@orbit-ui/foundation/dist/desktop.css");
//     import("@orbit-ui/foundation/dist/overcast.css");
//     import("@orbit-ui/foundation/dist/apricot.css");
// } else {
//     // The custom brand picker cause a rendering delay that we don't want to handle in the stories for
//     // performance reasons. To circonvent this problem, we statically load the apricot brand.
//     import("@orbit-ui/foundation/dist/apricot.css");
// }

// import "./styles/components-presets.css";
// import "./styles/stories.css";

//     addParameters({
//         options: {
//             theme: customStorybookTheme
//             // TODO:
//             // si "default", be first
//             // si "chromatic" be last
//             // pas certains de comprendre avec les folders
//             // storySort: (a, b) => {
//             //     // console.log(a[1]);

//             //     if (a[1].kind === b[1].kind) {
//             //         if (a[1].parameters.displayName === "default") {
//             //             return -1;
//             //         }
//             //         else if (b[1].parameters.displayName === "default") {
//             //             return 1;
//             //         }
//             //         else if (a[1].parameters.displayName === "knobs") {
//             //             return -1;
//             //         }
//             //         else if (b[1].parameters.displayName === "knobs") {
//             //             return 1;
//             //         }
//             //     }

//             //     return a[1].id.localeCompare(b[1].id);
//             // }
//         }
//     });

// if (mode === MODES.stories) {
//     addDecorator((storyFn, context) => withConsole()(storyFn)(context));
//     addDecorator((storyFn, context) => <StoryContainer story={storyFn()} context={context} />);
// } else {
//     addParameters({
//         docs: {
//             container: DocsContainer,
//             page: DocsPage
//         }
//     });
// }

// let stories = [];

// if (mode === MODES.stories) {
//     if (includeComponents) {
//         if (!isChromatic) {
//             stories = [...stories, require.context("../../packages/react-components/components/date-picker", true, /.stories.jsx$/)];
//         }

//         if (includeTests) {
//             stories = [...stories, require.context("../../packages/react-components/components/popup", true, /.chroma.jsx$/)];
//         }
//     }

//     // if (includeTheme) {
//     //     reqTheme = require.context("../stories/semantic-ui-theme", true, /.stories.jsx$/);
//     // }

//     // if (includeMaterials) {
//     //     reqMaterials = require.context("../stories/materials", true, /.stories.jsx$/);
//     // }
// } else {
//     stories = [...stories, require.context("../../packages/react-components", true, /.docs.mdx$/)];
// }

// configure(stories, module);
