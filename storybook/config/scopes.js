import { isNil } from "lodash";

const CHROMATIC_SCOPE = "chromatic";
const COMPONENTS_SCOPE = "components";
const SUI_THEME_SCOPE = "sui-theme";
const MATERIALS_SCOPE = "materials";

// Modes

// This is a custom flag to determine if storybook is runned by chromatic since the one provided by the chromatic CLI doesn't work in addons.
export const isChromatic = process.env.STORYBOOK_IS_CHROMATIC === "true";
export const isDocs = process.env.STORYBOOK_IS_DOCS === "true";

if (isChromatic && isDocs) {
    throw new Error("Storybook - STORYBOOK_IS_CHROMATIC and STORYBOOK_IS_DOCS shouldn't be both true");
}

const includeChromaticValue = process.env.STORYBOOK_INCLUDE_CHROMATIC;

export const includeChromatic = !isDocs && (isChromatic || isNil(includeChromaticValue) || includeChromaticValue === "true");

// Scopes

export const scopes = process.env.STORYBOOK_SCOPES;

let parsedScopes = null;

if (!isNil(scopes)) {
    parsedScopes = scopes.split(",");
}

export const includeComponents = isNil(parsedScopes) || parsedScopes.includes(COMPONENTS_SCOPE);
export const includeSemanticTheme = isNil(parsedScopes) || parsedScopes.includes(SUI_THEME_SCOPE);
export const includeMaterials = isNil(parsedScopes) || parsedScopes.includes(MATERIALS_SCOPE);
