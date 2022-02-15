const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');


var config ={

    devServer:{
        static: {
            directory: 'src',
        },
        
    },

    entry:'./src/index.js',

    output:{
        filename: 'output.js'
    },

    plugins:[
        new HtmlWebpackPlugin({
            filename: 'output.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'output.css'
        }),
        new StylelintPlugin({
            configFile: './src/index.css'
        }),
    ],

    module: {
        rules: [
            {
            test: /\.css$/,
            use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        },
                    },
                    'css-loader',
                ],
            },
        ],
    },
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devServer.hot = true;
        config.devServer.open = true;
    }

    if (argv.mode === 'production') {
        config.devServer.hot = false;
        config.devServer.open = false;
    }

    return config;
};