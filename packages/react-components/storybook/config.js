import { configure } from "@storybook/react";

import "@sharegate/tachyons-sg/css/tachyons.css";

import "@sharegate/semantic-ui-sg/button.css";
import "@sharegate/semantic-ui-sg/divider.css";
import "@sharegate/semantic-ui-sg/dropdown.css";
import "@sharegate/semantic-ui-sg/item.css";
import "@sharegate/semantic-ui-sg/menu.css";
import "@sharegate/semantic-ui-sg/transition.css";
import "@sharegate/semantic-ui-sg/input.css";
import "@sharegate/semantic-ui-sg/checkbox.css";
import "@sharegate/semantic-ui-sg/search.css";
import "@sharegate/semantic-ui-sg/loader.css";
import "@sharegate/semantic-ui-sg/icon.css";
import "@sharegate/semantic-ui-sg/popup.css";
import "@sharegate/semantic-ui-sg/placeholder.css";
import "@sharegate/semantic-ui-sg/progress.css";
import "@sharegate/semantic-ui-sg/label.css";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

/**
 * Uses Webpack Context
 * https://webpack.js.org/guides/dependency-management/#require-context
 * We are importing all stories from the packages directory.
 * If required we can update this to start at route, but for now lets
 * keep it at components.
 */
const req = require.context("../components", true, /.story.(jsx?|js?)$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
