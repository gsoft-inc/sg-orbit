module.exports = {
    roots: ["<rootDir>/packages/"],
    testMatch: ["**/tests/jest/*.test.ts?(x)"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    moduleNameMapper: {
        "\\.css$": "identity-obj-proxy",
        "\\.svg": "<rootDir>/__mocks__/svgr-mock.js",
        "@test-utils/(.*)$": "<rootDir>/tooling/jest-utils/$1",
        "@components/(.*)$": "<rootDir>/packages/components/src/$1",
        "@experimental/(.*)$": "<rootDir>/packages/experimental/src/$1",
        "@orbit-ui/components$": "<rootDir>/packages/components/src/index.ts"
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect",
        "<rootDir>/setup-jest.js"
    ],
    testEnvironment: "jsdom",
    testPathIgnorePatterns: [ // TODO: tests should not be built in the dist folder
        "<rootDir>/packages/components/dist",
        "<rootDir>/packages/experimental/dist"
    ],
    verbose: true
};

