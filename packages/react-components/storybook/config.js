import { addDecorator, configure } from "@storybook/react";
import { withConsole } from "@storybook/addon-console";
import { withKnobs } from "@storybook/addon-knobs";

import "@sharegate/css-normalize";
import "@sharegate/foundation";
import "@sharegate/semantic-ui-theme";
import "@sharegate/tachyons";

import "./style/custom.css";
import "./style/fonts/calibre/calibre.css";

// TODO: register "knobs" by story, not globally.
addDecorator(withKnobs);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

const req = require.context("../components", true, /.stories.(jsx?|js?)$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
