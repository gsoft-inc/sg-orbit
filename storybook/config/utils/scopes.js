const { isNil } = require("lodash");

export const scope = process.env.STORYBOOK_SCOPE;

export const includeComponents = isNil(scope) || scope === "components";
export const includeTheme = isNil(scope) || scope === "theme";
export const includeMaterials = isNil(scope) || scope === "materials";
