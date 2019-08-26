/* eslint react/jsx-filename-extension: "off" */

import { StoryContainer } from "./story-container";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { customStorybookTheme } from "./theme";
import { withConsole } from "@storybook/addon-console";

// Dont move, it must be imported after storybook/react.
import { includeComponents, includeTheme } from "./get-storybook-scope";
import { isChromatic } from "storybook-chromatic";

import "@orbit-ui/css-normalize";
import "@orbit-ui/foundation/dist/apricot.css";
import "@orbit-ui/semantic-ui-theme";
import "@orbit-ui/tachyons";

// Custom font makes chromatic inconsistent and cause "false positive".
if (!isChromatic()) {
    import("@orbit-ui/fonts");
}

import "./style/components-presets.css";
import "./utils/stories.css";

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

if (includeComponents) {
    reqComponents = require.context("../components", true, /(play|specs).stories.jsx$/);
}

// TODO: Rework this once storybook has been moved out of "react-components".
if (includeTheme) {
    reqTheme = require.context("../stories", true, /.stories.jsx$/);
}

function loadStories() {
    if (includeComponents) {
        reqComponents.keys().forEach(filename => reqComponents(filename));
    }

    if (includeTheme) {
        reqTheme.keys().forEach(filename => reqTheme(filename));
    }
}

configure(loadStories, module);
