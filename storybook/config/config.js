/* eslint react/jsx-filename-extension: "off" */

import { StoryContainer } from "./story-container";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { customStorybookTheme } from "./theme";
import { includeComponents, includeMaterials, includeTheme } from "./get-scope";
import { withConsole } from "@storybook/addon-console";

// Dont move, it must be imported after storybook/react.
import { isChromatic } from "storybook-chromatic";

import "@orbit-ui/css-normalize";
import "@orbit-ui/foundation/dist/apricot.css";
import "@orbit-ui/icons";
import "@orbit-ui/semantic-ui-theme";
import "@orbit-ui/tachyons/dist/apricot.css";

// Custom font makes chromatic inconsistent and cause "false positive".
if (!isChromatic()) {
    import("@orbit-ui/fonts");
}

import "./style/components-presets.css";
import "./style/stories.css";

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
