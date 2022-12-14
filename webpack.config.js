const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const HtmlTemplatePlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")

module.exports = {
    mode: "development",
    entry: {
        index: [
            path.resolve(__dirname, "src/script/bundle.js"),
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        clean: true,
        filename: "[name][fullhash].js",
        // assetModuleFilename: "[name][ext]",
        chunkFilename: "[id].[fullhash].js"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                // type: "asset/resource"
                use: [
                    {
                        loader: ImageMinimizerPlugin.loader,
                        // enforce: "pre",
                        options: {
                            minimizer: {
                                implementation: ImageMinimizerPlugin.imageminMinify,
                                options: {
                                    plugins: [
                                        "imagemin-gifsicle",
                                        "imagemin-mozjpeg",
                                        "imagemin-pngquant",
                                        "imagemin-svgo",
                                    ],
                                },
                            },
                        },
                    },
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            }
        ]
    },
    plugins: [
        new HtmlTemplatePlugin({
            minify: true,
            filename: "index.html",
            template: path.resolve(__dirname, "src/views/index.html")
        })
    ],
    devtool: "inline-source-map",
    devServer: {
        static: "./dist",
        compress: true,
        port: 1234
    },
    resolve: {
        extensions: [".js", ".html", ".scss"]
    },
    // optimization: {
    //     runtimeChunk: "single",
    //     minimizer: [
    //         "...",
    //         new ImageMinimizerPlugin({
    //             minimizer: {
    //                 implementation: ImageMinimizerPlugin.imageminMinify,
    //                 options: {
    //                     // Lossless optimization with custom option
    //                     // Feel free to experiment with options for better result for you
    //                     plugins: [
    //                         ["gifsicle", { interlaced: true }],
    //                         ["jpegtran", { progressive: true }],
    //                         ["optipng", { optimizationLevel: 5 }],
    //                         // Svgo configuration here https://github.com/svg/svgo#configuration
    //                         [
    //                             "svgo",
    //                             {
    //                                 plugins: [
    //                                     {
    //                                         name: "preset-default",
    //                                         params: {
    //                                             overrides: {
    //                                                 removeViewBox: false,
    //                                                 addAttributesToSVGElement: {
    //                                                     params: {
    //                                                         attributes: [
    //                                                             { xmlns: "http://www.w3.org/2000/svg" },
    //                                                         ],
    //                                                     },
    //                                                 },
    //                                             },
    //                                         },
    //                                     },
    //                                 ],
    //                             },
    //                         ],
    //                     ],
    //                 },
    //             },
    //         }),
    //     ],
    // }
}