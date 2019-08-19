const { isNil } = require("lodash");

const scope = process.env.STORYBOOK_ORBIT_SCOPE;

const includeComponents = isNil(scope) || scope === "components";
const includeTheme = isNil(scope) || scope === "theme";

module.exports = {
    includeComponents,
    includeTheme
};
