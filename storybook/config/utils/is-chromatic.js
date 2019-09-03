// This is a custom flag to determine if storybook is runned by chromatic since the one provided by the chromatic CLI doesn't work in addons.

export const isChromatic = process.env.STORYBOOK_ORBIT_IS_CHROMATIC === "true";
