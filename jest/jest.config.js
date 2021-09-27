const path = require("path");

module.exports = {
    rootDir: path.resolve(__dirname, ".."),
    roots: [
        "<rootDir>/packages/styles",
        "<rootDir>/packages/react-components"
    ],
    testMatch: ["**/tests/jest/*.test.ts?(x)"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": path.resolve("jest/babel-transform.js")
    },
    moduleNameMapper: {
        "\\.css$": "identity-obj-proxy",
        "\\.svg": "<rootDir>/jest/svgr-mock.js",
        "@utils/(.*)$": "<rootDir>/jest/utils/$1",
        "@styles/(.*)$": "<rootDir>/packages/styles/src/$1",
        "@react-components/(.*)$": "<rootDir>/packages/react-components/src/$1"
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect",
        "<rootDir>/jest/setup-jest.js"
    ],
    testEnvironment: "jsdom",
    testPathIgnorePatterns: [
        "<rootDir>/packages/react-components/dist"
    ],
    verbose: true
};

