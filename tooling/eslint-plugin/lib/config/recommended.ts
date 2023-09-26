import type { Linter } from "eslint";

const config: Linter.Config = {
    plugins: ["@orbit-ui"],
    extends: [
        "plugin:@orbit-ui/jsx-a11y"
    ]

};

// Using TypeScript "export" keyword until ESLint support ESM.
// Otherwise we must deal with a weird CommonJS output from esbuild which is not worth it.
// For more info, see: https://github.com/evanw/esbuild/issues/1079
export = config;
