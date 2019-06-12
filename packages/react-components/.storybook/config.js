import React from "react";
import { configure } from "@storybook/react";

/**
 * Uses Webpack Context
 * https://webpack.js.org/guides/dependency-management/#require-context
 * We are importing all stories from the packages directory.
 * If required we can update this to start at route, but for now lets
 * keep it at components.
 */
const req = require.context("../packages", true, /.story.(jsx?|js?)$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
