import { isNil } from "lodash";

///////////////////

const isDebug = process.env.NODE_ENV !== "production";

// This is a custom flag to determine if storybook is runned by chromatic since the one provided by the chromatic CLI doesn't work in addons.
export const isChromatic = process.env.STORYBOOK_IS_CHROMATIC === "true";
export const isDocs = process.env.STORYBOOK_IS_DOCS === "true";

if (isChromatic && isDocs) {
    throw new Error("Storybook - STORYBOOK_IS_CHROMATIC and STORYBOOK_IS_DOCS shouldn't be both true");
}

///////////////////

const includeChromaticValue = process.env.STORYBOOK_INCLUDE_CHROMATIC;

export const includeChromatic = !isDocs && (isChromatic || isNil(includeChromaticValue) || includeChromaticValue === "true");
export const includeStories = !isChromatic;

///////////////////

export function printEnvironment() {
    if (isDebug) {
        console.log("**************************");
        console.log("Is runned by chromatic: ", isChromatic);
        console.log("Is in docs mode: ", isDocs);
        console.log("Include chromatic stories: ", includeChromatic);
        console.log("**************************");
    }
}


