import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";

export default {
    src: "./src",
    title: "Sharegate Orbit",
    description: "Sharegate Orbit components documentation",
    menu: [
        { name: "Introduction", menu: [] },
        { name: "Foundations", menu: [] },
        { name: "Components", menu: [] }
    ],
    notUseSpecifiers: true,
    codeSandbox: false,
    filterComponents: files => files.filter(filepath => /w*.(jsx)$/.test(filepath)),
    // We could use the docz plugin "docz-plugin-css" instead of defining our own webpack loaders but the packages is not maintained
    // and used obsolete dependencies.
    modifyBundlerConfig: (config, isDev) => ({
        ...config,
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
