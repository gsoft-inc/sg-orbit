import type { ESLint } from "eslint";

const plugin: ESLint.Plugin = {
    configs: {
        // Parts
        recommended: require("./config/recommended"),
        "jsx-a11y": require("./config/jsx-a11y")
    }
};

// Using TypeScript "export" keyword until ESLint support ESM.
// Otherwise we must deal with a weird CommonJS output from esbuild which is not worth it.
// For more info, see: https://github.com/evanw/esbuild/issues/1079
export = plugin;
