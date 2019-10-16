/* eslint react/jsx-filename-extension: "off" */

import { DocsContainer, DocsPage } from "@storybook/addon-docs/blocks";
import { MODES, includeComponents, includeMaterials, includeTests, includeTheme, isChromatic, mode, scope } from "./utils";
import { StoryContainer } from "./story-container";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { customStorybookTheme } from "./theme";
import { withConsole } from "@storybook/addon-console";

import "@orbit-ui/css-normalize";
import "@orbit-ui/icons";
import "@orbit-ui/semantic-ui-theme";
import "@orbit-ui/tachyons/dist/apricot.css";

console.log("IS CHROMATIC: ", isChromatic);
console.log("INCLUDE TESTS: ", includeTests);
console.log("MODE: ", mode);
console.log("SCOPE: ", scope);

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

if (mode === MODES.stories) {
    import("./styles/stories.css");
}

// Option defaults.
addParameters({
    docs: {
        container: DocsContainer,
        page: DocsPage
    },
    options: {
        theme: customStorybookTheme
    }
});

if (mode === MODES.stories) {
    addDecorator((storyFn, context) => withConsole()(storyFn)(context));
    addDecorator((storyFn, context) => <StoryContainer story={storyFn()} context={context} />);
}

let stories = [];

if (mode === MODES.stories) {
    if (includeComponents) {
        if (!isChromatic) {
            stories = [...stories, require.context("../../packages/react-components", true, /.stories.mdx$/)];
        }

        if (includeTests) {
            stories = [...stories, require.context("../../packages/react-components", true, /.chroma.mdx$/)];
        }
    }

    // if (includeTheme) {
    //     reqTheme = require.context("../stories/semantic-ui-theme", true, /.stories.jsx$/);
    // }

    // if (includeMaterials) {
    //     reqMaterials = require.context("../stories/materials", true, /.stories.jsx$/);
    // }
} else {
    stories = [...stories, require.context("../../packages/react-components", true, /.docs.mdx$/)];
}

// if (includeComponents) {
//     // reqComponents = require.context("../stories/react-components", true, /(play|specs).stories.jsx$/);
//     reqComponents = require.context("../stories/react-components/popup", true, /(play|specs).stories.jsx$/);
// }

// if (includeTheme) {
//     reqTheme = require.context("../stories/semantic-ui-theme", true, /.stories.jsx$/);
// }

// if (includeMaterials) {
//     reqMaterials = require.context("../stories/materials", true, /.stories.jsx$/);
// }

// Have a loose path or make 2 required.context (one for components and one for /storybook/docs)
// reqDocs = require.context("../../packages/react-components", true, /.docs.mdx$/);

// function loadStories() {
//     // if (includeComponents) {
//     //     reqComponents.keys().forEach(filename => reqComponents(filename));
//     // }

//     // if (includeTheme) {
//     //     reqTheme.keys().forEach(filename => reqTheme(filename));
//     // }

//     // if (includeMaterials) {
//     //     reqMaterials.keys().forEach(filename => reqMaterials(filename));
//     // }

//     return reqDocs.keys().forEach(filename => reqDocs(filename));
// }

// configure(loadStories, module);

// const stories = [reqDocs];

configure(stories, module);
