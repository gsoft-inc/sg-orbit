module.exports = {
    root: true,
    rules: {
        "linebreak-style": ["warn", "unix"]
    },
    overrides:
    [
        {
            files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
            parser: "@typescript-eslint/parser", // we use the typescript parser for js files as well
            env: {
                commonjs: true,
                node: true,
                es6: true
            },
            extends: [
                "plugin:@sharegate/core",
                "plugin:@sharegate/react",
                "plugin:@sharegate/jest",
                "plugin:@sharegate/typescript",
                "plugin:@sharegate/testing-library"
            ],
            rules: {
                "testing-library/no-unnecessary-act": "off", // multiple errors, should be fixed in another PR. 515 errors
                "testing-library/prefer-screen-queries": "off" // multiple errors, should be fixed in another PR. 1343 errors
            }
        },
        {
            files: ["*.ts", "*.tsx"],
            rules: {
                "react/no-unused-prop-types": "off", // Issue with typescript
                "@typescript-eslint/no-explicit-any": "off", // we use any a lot in orbit
                "@typescript-eslint/ban-ts-comment": "off"
            }
        },
        {
            files: ["*.sample.jsx"],
            rules: {
                "no-unused-expressions": "off",
                "no-unused-vars": "off",
                "no-undef": "off",
                "react/jsx-no-undef": "off"
            }
        },
        {
            // react inside mdx is no longer linted. But it's been disabled for a while so it's ok for now.
            // we should take a look at it later
            extends: [
                "plugin:@sharegate/mdx"
            ],
            files: ["*.mdx"],
            parserOptions: {
                "ecmaVersion": 6,
                "sourceType": "module",
                "ecmaFeatures": {
                    "modules": true,
                    jsx: true
                }
            },
            globals: {
                "props": true
            },
            rules:{
                "react/jsx-no-undef": "off"
            }
        }
    ]
};
