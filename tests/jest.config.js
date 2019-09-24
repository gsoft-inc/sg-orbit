const path = require("path");

module.exports = {
    rootDir: path.resolve(__dirname, ".."),
    roots: ["<rootDir>/packages/react-components"],
    transform: {
        "^.+\\.(js|jsx)$": path.resolve("tests/babel-transform.js")
    },
    // https://github.com/facebook/jest/issues/6229#issuecomment-403539460
    transformIgnorePatterns: [
        "/node_modules/(?!(@babel|@orbit-ui)).+\\.(js|jsx)$"
    ],
    moduleNameMapper: {
        "\\.svg": "<rootDir>/tests/svgr-mock.js"
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect"
    ],
    verbose: true
};

