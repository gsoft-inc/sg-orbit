import { configure } from "@storybook/react";

import "@sharegate/foundation";
import "@sharegate/tachyons";
import "@sharegate/semantic-ui-theme";

import "./style/fonts/calibre/calibre.css";
import "./style/custom.css";

const req = require.context("../components", true, /.story.(jsx?|js?)$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
