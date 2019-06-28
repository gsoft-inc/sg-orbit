import { configure } from "@storybook/react";

import "@sharegate/css-normalize";
import "@sharegate/foundation";
import "@sharegate/semantic-ui-theme";
import "@sharegate/tachyons";

import "./style/custom.css";
import "./style/fonts/calibre/calibre.css";

const req = require.context("../components", true, /.story.(jsx?|js?)$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
