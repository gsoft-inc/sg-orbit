/* eslint react/jsx-filename-extension: "off" */

import { StoryContainer } from "./story-container";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { customStorySort } from "./sort-stories";
import { customStorybookTheme } from "./theme";
import { includeChromatic, includeComponents, includeMaterials, includeSemanticTheme, isChromatic, isDocs, scopes } from "./scopes";
import { isDebug } from "./env";
import { isNil } from "lodash";
import { withConsole } from "@storybook/addon-console";

import "@orbit-ui/css-normalize";
import "@orbit-ui/icons";
import "@orbit-ui/semantic-ui-theme";
import "@orbit-ui/tachyons/dist/apricot.css";

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

import "./styles/fix-docs-addon.css";
import "./styles/preview-area.css";

if (isDebug) {
    console.log("**************************");
    console.log("Is runned by chromatic: ", isChromatic);
    console.log("Is in docs mode: ", isDocs);
    console.log("Include chromatic stories: ", includeChromatic);
    console.log("Scopes: ", isNil(scopes) ? "None" : scopes);
    console.log("**************************");
}

addParameters({
    options: {
        theme: customStorybookTheme,
        storySort: customStorySort
    },
    docs: {
        inlineStories: true
    }
});

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

if (!isDocs) {
    // TODO: potentiellement plus besoin d'avoir le StoryContainer qui agit en tant qu'error boundaries (il semble en avoir un nouveau natif qui fait la job, anyway celui la n'est pas appelé)
    addDecorator((storyFn, context) => <StoryContainer story={storyFn()} context={context} />);
}

let stories = [];

if (includeComponents) {
    stories = [...stories, require.context("../../packages/react-components/components", true, /.stories.mdx$/)];

    if (includeChromatic) {
        stories = [...stories, require.context("../../packages/react-components/components", true, /.chroma.jsx$/)];
    }
}

if (includeSemanticTheme) {
    stories = [...stories, require.context("../stories/semantic-ui", true, /.stories.mdx$/)];

    if (includeChromatic) {
        stories = [...stories, require.context("../stories/materials", true, /.chroma.jsx$/)];
    }
}

if (includeMaterials) {
    stories = [...stories, require.context("../stories/semantic-ui", true, /.stories.mdx$/)];

    if (includeChromatic) {
        stories = [...stories, require.context("../stories/semantic-ui", true, /.chroma.jsx$/)];
    }
}

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
