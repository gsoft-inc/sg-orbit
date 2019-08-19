const { isNil } = require("lodash");

const scope = process.env.STORYBOOK_ORBIT_SCOPE;

const isComponents = isNil(scope) || scope === "components";
const isTheme = isNil(scope) || scope === "theme";

module.exports = {
    isComponents,
    isTheme
};
