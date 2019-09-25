const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

export default {
    src: "./src",
    public: "./public",
    dest: "/dist",
    title: "ShareGate orbit",
    description: "ShareGate orbit components documentation",
    menu: [
        { name: "Introduction", menu: [] },
        { name: "Materials", menu: ["Colours", "Typography", "Spacing", "Border Radius", "Shadows"] },
        { name: "Components", menu: [] }
    ],
    notUseSpecifiers: true,
    codeSandbox: false,
    themeConfig: {
        colors: {
            primary: "#566077"
        },
        styles: {
            logo: {
                alignItems: "center"
            },
            body: {
                fontFamily: "Calibre"
            }
        },
        logo: {
            src: "https://raw.githubusercontent.com/gsoft-inc/sg-orbit/master/assets/orbit.svg?sanitize=true",
            width: 180
        }
    },
    htmlContext: {
        favicon: "https://raw.githubusercontent.com/gsoft-inc/sg-orbit/master/assets/favicon.ico"
    },
    filterComponents: files => files.filter(filepath => /w*.(jsx)$/.test(filepath)),
    // We could use the docz plugin "docz-plugin-css" instead of defining our own webpack loaders but the packages is not maintained
    // and used obsolete dependencies.
    modifyBundlerConfig: (config, isDev) => ({
        ...config,
        resolve: {
            ...config.resolve,
            // Custom alias to fix https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react
            alias: {
                "react": path.resolve(__dirname, "..", "node_modules/react"),
                "react-dom": path.resolve(__dirname, "..", "node_modules/react-dom")
            }
        },
        module: {
            ...config.module,
            rules: [
                ...config.module.rules,
                {
                    test: /\.css$/,
                    use: [
                        isDev
                            ? {
                                loader: "style-loader"
                            }
                            : {
                                loader: MiniCssExtractPlugin.loader
                            },
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                                sourceMap: isDev
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                config: {
                                    path: "./postcss.config.js"
                                }
                            }
                        }
                    ]
                }
            ]
        },
        optimization: {
            ...config.optimization,
            minimizer: [new OptimizeCSSAssetsPlugin({})],
            splitChunks: {
                ...config.optimization.splitChunks,
                cacheGroups: {
                    ...config.optimization.splitChunks.cacheGroups,
                    styles: {
                        chunks: "all",
                        name: "styles",
                        test: module => /(\.module)?\.css$/.test(module.type),
                        enforce: true
                    }
                }
            }
        },
        plugins: [
            ...config.plugins,
            new MiniCssExtractPlugin({
                filename: "static/css/[name].[hash].css"
            })
        ]
    })
};
