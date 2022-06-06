const path = require("path");

module.exports = {
    mode: "development",
    entry: [path.resolve(__dirname, "src/bundler.js")],
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
    },
    devtool: "source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "public"),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
};
