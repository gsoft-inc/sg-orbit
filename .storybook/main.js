const { customizeWebpack } = require("./webpack.config");
const { includeChromatic, includeDocs, printEnvironment, isChromatic, isDebug } = require("./env");
const path = require("path");

printEnvironment();

let stories = [];

if (includeDocs) {
    stories = [
        // TODO simplify imports for any pkgs /docs/**/*.stories.mdx
        "../docs/**/*.stories.mdx",
        "../packages/icons/docs/**/*.stories.mdx",
        "../packages/components/src/**/docs/**/*.stories.mdx",
        "../packages/experimental/src/**/docs/**/*.stories.mdx"
    ];
}

if (includeChromatic) {
    stories = [
        ...stories,
        // TODO remove chroma and simplify imports
        "../packages/components/**/tests/chromatic/**/*.chroma.jsx",
        "../packages/components/**/tests/chromatic/**/*.stories.tsx",
        "../packages/experimental/**/tests/chromatic/**/*.chroma.tsx",
        "../packages/experimental/**/tests/chromatic/**/*.stories.tsx"
    ];
}

const config = {
    stories: stories,
    addons: [
        {
            name: "@storybook/addon-postcss",
            /** @type {import("@storybook/addon-postcss").PresetOptions} */
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                    postcssOptions: {
                        config: path.resolve(__dirname, "postcss.config.js"),
                    }
                },
            }
        },
        {
            name: "@storybook/addon-essentials",
            /** @type {import("@storybook/addon-essentials").PresetOptions} */
            options: {
                actions: false,
                backgrounds: false,
                controls: false,
                measure: false,
                outline: false
            }
        },
        {
            name: "@storybook/addon-a11y",
            options: {
                runOnly: {
                    type: "tag",
                    values: ["wcag2a", "wcag2aa"]
                }
            }
        }
    ],
    webpackFinal: customizeWebpack,
    reactOptions: {
        strictMode: true
    }
};

// Disable Typescript during Chromatic tests, otherwise we use too much RAM in our CI
if (isChromatic) {
    config.typescript = {
        check: false,
        reactDocgen: false
    };
}

// An optimized version of the components props will be visibile in the production build. It's available for debug & chromatic because the performance cost is too big.
if (!isChromatic && !isDebug) {
    config.typescript = {
        reactDocgenTypescriptOptions: {
        // Slow down Storybook initial rendering by 3x but his essential to render a union values instead of a named export (e.g. will render "top" | "bottom" instead of PositionProp).
            shouldExtractValuesFromUnion: true,
            shouldExtractLiteralValuesFromEnum: true,
            shouldRemoveUndefinedFromOptional: true,
            exclude: ["node_modules"],
            propFilter: (prop, component) => {
                if (prop.parent && /node_modules/.test(prop.parent.fileName)) {
                    return false;
                }

                if (component && component.name && !component.name.startsWith("Inner")) {
                    return false;
                }

                return true;
            }
        }
    };
}

module.exports = config;
