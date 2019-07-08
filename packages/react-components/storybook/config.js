import { StoryContainer } from "./story-container";
import { addDecorator, configure } from "@storybook/react";
import { withConsole } from "@storybook/addon-console";

import "@sharegate/css-normalize";
import "@sharegate/foundation";
import "@sharegate/semantic-ui-theme";
import "@sharegate/tachyons";

import "./style/custom.css";
import "./style/fonts/calibre/calibre.css";

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addDecorator((storyFn, context) => <StoryContainer story={storyFn()} context={context} />);

const req = require.context("../components", true, /.stories.(jsx?|js?)$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
