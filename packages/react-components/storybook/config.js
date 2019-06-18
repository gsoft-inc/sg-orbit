import { configure } from "@storybook/react";

import "@sharegate/tachyons";
import "@sharegate/semantic-ui-theme/semantic/dist/semantic.css";

import "./style/fonts/calibre/calibre.css";
import "./style/custom.css";

const req = require.context("../components", true, /.story.(jsx?|js?)$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
