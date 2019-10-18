const path = require("path");

module.exports = {
    rootDir: path.resolve(__dirname, ".."),
    roots: ["<rootDir>/packages/react-components"],
    transform: {
        "^.+\\.(js|jsx)$": path.resolve("jest/babel-transform.js")
    },
    // https://github.com/facebook/jest/issues/6229#issuecomment-403539460
    transformIgnorePatterns: [
        "/node_modules/(?!(@babel|@juggle)).+\\.js$"
    ],
    moduleNameMapper: {
        "\\.svg": "<rootDir>/jest/svgr-mock.js",
        "@utils/(.*)$": "<rootDir>/jest/utils/$1",
        "@react-components/(.*)$": "<rootDir>/packages/react-components/components/$1"
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect"
    ],
    verbose: true
};

