const isDebug = process.env.NODE_ENV !== "production";

// This is a custom flag to determine if storybook is runned by chromatic since the one provided by the chromatic CLI doesn't work in addons.
const isChromatic = process.env.STORYBOOK_IS_CHROMATIC === "true";
const isDocs = process.env.STORYBOOK_IS_DOCS_SITE === "true";

if (isChromatic && isDocs) {
    throw new Error("Storybook - STORYBOOK_IS_CHROMATIC and STORYBOOK_IS_DOCS_SITE shouldn't be both true");
}

///////////////////

const includeChromaticValue = process.env.STORYBOOK_INCLUDE_CHROMATIC;

const includeChromatic = !isDocs && (isChromatic || includeChromaticValue !== "false");
const includeDocs = !isChromatic;

///////////////////

function printEnvironment() {
    if (isDebug) {
        console.log("**************************");
        console.log("Is runned by chromatic: ", isChromatic);
        console.log("Is docs site: ", isDocs);
        console.log("Include docs stories: ", includeDocs);
        console.log("Include chromatic stories: ", includeChromatic);
        console.log("**************************");
    }
}

module.exports = {
    isDebug,
    isChromatic,
    isDocs,
    includeChromatic,
    includeDocs,
    printEnvironment
};


