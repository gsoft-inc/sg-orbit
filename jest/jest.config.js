const path = require("path");

module.exports = {
    rootDir: path.resolve(__dirname, ".."),
    roots: [
        "<rootDir>/packages/components"
    ],
    testMatch: ["**/tests/jest/*.test.ts?(x)"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": path.resolve("jest/babel-transform.js")
    },
    moduleNameMapper: {
        "\\.css$": "identity-obj-proxy",
        "@jest-utils$": "<rootDir>/jest/utils/index.ts",
        "@components/(.*)$": "<rootDir>/packages/components/src/$1"
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect",
        "<rootDir>/jest/setup-jest.js"
    ],
    testEnvironment: "jsdom",
    testPathIgnorePatterns: [
        "<rootDir>/packages/components/dist"
    ],
    verbose: true
};

