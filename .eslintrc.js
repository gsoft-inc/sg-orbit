module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020
    },
    env: {
        commonjs: true,
        node: true,
        es6: true
    },
    rules: {
        "linebreak-style": ["warn", "unix"]
    },
    overrides:
    [
        {
            files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
            extends: [
                "plugin:@sharegate/core",
                "plugin:@sharegate/react",
                "plugin:@sharegate/jest",
                "plugin:@sharegate/typescript",
                "plugin:@sharegate/testing-library"
            ],
            rules: {
                "jest/no-commented-out-tests": "off", // TODO remove this when we fix all commented out tests
                "testing-library/no-unnecessary-act": "off", // multiple errors, should be fixed in another PR. 515 errors
                "testing-library/prefer-screen-queries": "off", // multiple errors, should be fixed in another PR. 1343 errors
                "testing-library/prefer-find-by": "off", // multiple errors, should be fixed in another PR. 135 errors
                "testing-library/no-node-access": "off", // multiple errors, should be fixed in another PR. 37 errors
                "testing-library/render-result-naming-convention": "off", // multiple errors, should be fixed in another PR. 5 errors
                "testing-library/prefer-presence-queries": "off", // multiple errors, should be fixed in another PR. 21 errors
                "testing-library/no-container": "off"// multiple errors, should be fixed in another PR. 15 issues
            }
        },
        {
            files: ["*.ts", "*.tsx"],
            rules: {
                "react/no-unused-prop-types": "off" // Issue with typescript
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
            }
        }
    ]
};
