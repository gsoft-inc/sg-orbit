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

if (!isDocs) {
    addDecorator((storyFn, context) => withConsole()(storyFn)(context));
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
