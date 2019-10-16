import { isNil } from "lodash";

const includeTestsArg = process.env.STORYBOOK_INCLUDE_TESTS;

// This is a custom flag to determine if storybook is runned by chromatic since the one provided by the chromatic CLI doesn't work in addons.
export const isChromatic = process.env.STORYBOOK_IS_CHROMATIC === "true";
export const includeTests = isNil(includeTestsArg) || includeTestsArg === "true";
