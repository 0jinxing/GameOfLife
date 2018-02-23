const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

const configer = {
    entry: "./app/entry.ts",
    output: {
        path: path.resolve(`${__dirname}/dist`),
        filename: "js/[name].bundle.js"
    },
    module: {
        rules: [
            { test: /\.ts(x?)$/, exclude: ["./node_modules"], use: "ts-loader" },
            { test: /\.css$/, exclude: ["./node_modules"], use: ["style-loader", "css-loader"] }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: "index.html",
            template: "./app/index.html",
            hash: true
        }),
        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         resolve: {
        //             extensions: ['', '.ts', '.tsx']
        //         }
        //     }
        // }),
        // new webpack.optimize.ModuleConcatenationPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
};
module.exports = configer;