import path from "path";

import Dotenv from "dotenv-webpack";
import FilterWarningsPlugin from "webpack-filter-warnings-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import TerserJSPlugin from "terser-webpack-plugin";

import pkg from "./package.json";

export default {
    src: "./",
    public: "./public",
    title: "Ztopia UI",
    description: pkg.description,
    theme: "docz-theme-default",
    notUseSpecifiers: true,
    typescript: true,
    codeSandbox: false,
    /** Control menu order */
    menu: [
        "Introduction",
        "Components"
    ],
    filterComponents: files =>
        files.filter(file => /([^d]\.(t|j)sx?)$/.test(file)),
    modifyBundlerConfig: (config, isDev) => ({
        ...config,
        module: {
            ...config.module,
            rules: [
                ...config.module.rules,
                {
                    test: /\.css$/,
                    include: [
                        path.resolve(__dirname, "./styles"),
                        path.resolve(__dirname, "./helpers"),
                        path.resolve(__dirname, "./node_modules/rc-tooltip"),
                        path.resolve(__dirname, "./node_modules/rc-slider"),
                        path.resolve(__dirname, "./node_modules/rc-drawer"),
                        path.resolve(__dirname, "./node_modules/react-responsive-carousel"),
                        path.resolve(__dirname, "./node_modules/react-toastify"),
                        path.resolve(__dirname, "./node_modules/react-datepicker"),
                        path.resolve(__dirname, "./node_modules/react-big-calendar"),
                        path.resolve(__dirname, "./node_modules/mapbox-gl")
                    ],
                    use: [
                        isDev
                            ? {
                                loader: "style-loader",
                                options: {
                                    sourceMap: true
                                }
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
                            loader: "postcss-loader"
                        }
                    ]
                }
            ]
        },
        optimization: {
            ...config.optimization,
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
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
            }),
            new FilterWarningsPlugin({
                exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
            }),
            new Dotenv()
        ]
    }),
    themeConfig: {
        logo: {
            src: "/public/images/logo.png"
        }
    }
};
