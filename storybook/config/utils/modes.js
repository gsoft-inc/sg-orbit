const { isNil } = require("lodash");

export const MODES = {
    stories: "Stories",
    docs: "Docs"
};

const modeArg = process.env.STORYBOOK_MODE;

let currentMode;

if (isNil(modeArg)) {
    currentMode = MODES.stories;
} else {
    if (isNil(MODES[modeArg])) {
        throw new Error(`Storybook - ${modeArg} is not a valid mode.`);
    }

    currentMode = currentMode === MODES.docs ? MODES.docs : MODES.stories;
}

export const mode = currentMode;
