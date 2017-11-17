var webpack = require("webpack")
var path = require("path")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

process.noDeprecation = true

module.exports = {
    entry: "./src/client/index.js",
    output: {
        path: path.join(__dirname, 'assets'),
        filename: "bundle.js",
        sourceMapFilename: "bundle.map"
        //publicPath: path.join(__dirname, 'assets')
        //publicPath: "http://localhost:3000/"
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'stage-0', 'react', "es2015"]
                }
            },
            {
                test: /\.(png|jpg)$/, loader: 'file-loader?limit=20000'//name=/src/images/[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["style-loader", "css-loader", {
                        loader: "postcss-loader",
                        options: {
                          plugins: () => [require("autoprefixer")]
                        }}]
                })
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader",{
                        loader: "postcss-loader",
                        options: {
                          plugins: () => [require("autoprefixer")]
                        }}, "sass-loader"]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("bundle.css"),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            warnings: false,
            mangle: false
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true
        }),
         new webpack.LoaderOptionsPlugin({
        debug: true
        })
    ]
}