/* eslint react/jsx-filename-extension: "off" */

import { StoryContainer } from "./story-container";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { customStorybookTheme } from "./theme";
import { includeComponents, includeMaterials, includeTheme, isChromatic } from "./utils";
import { withConsole } from "@storybook/addon-console";

// Dont move, it must be imported after storybook/react.
import "storybook-chromatic";

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

import "./styles/components-presets.css";
import "./styles/stories.css";

// Option defaults.
addParameters({
    options: {
        theme: customStorybookTheme
    }
});

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addDecorator((storyFn, context) => <StoryContainer story={storyFn()} context={context} />);

let reqComponents;
let reqTheme;
let reqMaterials;

if (includeComponents) {
    reqComponents = require.context("../stories/react-components", true, /(play|specs).stories.jsx$/);
}

if (includeTheme) {
    reqTheme = require.context("../stories/semantic-ui-theme", true, /.stories.jsx$/);
}

if (includeMaterials) {
    reqMaterials = require.context("../stories/materials", true, /.stories.jsx$/);
}

function loadStories() {
    if (includeComponents) {
        reqComponents.keys().forEach(filename => reqComponents(filename));
    }

    if (includeTheme) {
        reqTheme.keys().forEach(filename => reqTheme(filename));
    }

    if (includeMaterials) {
        reqMaterials.keys().forEach(filename => reqMaterials(filename));
    }
}

configure(loadStories, module);
