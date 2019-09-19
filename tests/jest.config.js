const path = require("path");

// setupFiles

module.exports = {
    rootDir: path.resolve(__dirname, ".."),
    roots: ["<rootDir>/packages/react-components/components"],
    transform: {
        "^.+\\.(js|jsx)$": path.resolve("tests/babel-transform.js")
    },
    transformIgnorePatterns: [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"
    ],
    verbose: true
};
