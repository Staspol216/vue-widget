const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const Dotenv = require('dotenv-webpack');


function buildLoaders({isDev}) {
    const vueLoader = {
        test: /\.vue$/,
        loader: 'vue-loader',
    };
    const cssLoaders = {
        test: /\.(sa|sc|c)ss$/,
        use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader, 
            {
                loader: 'css-loader', 
                options: {
                    modules: {
                        localIdentName: "[name]__[local]___[hash:base64:5]",
                    },	
                }
            }, 
            'sass-loader'
        ],
    };
    const tsLoader = {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
            appendTsSuffixTo: [/\.vue$/],
        },
    };
    
    return [
        vueLoader,
        cssLoaders,
        tsLoader
    ]
};

function buildWebpackConfig(options) {
    const { paths, mode, isDev } = options;

    const devServer = {
        static: './build',
        open: true,
        hot: true,
    };

    const plugins = [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
        }),
        new VueLoaderPlugin(),
    ];

    const minify = {
        minimize: true,
        minimizer: [
            '...',
            new CssMinimizerPlugin(),
        ],
    }

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
        },
        plugins,
        module: {
            rules: buildLoaders(options),
        },
        resolve: {
            extensions: ['.ts', '.js', '.vue', '.json'],
            alias: {
                '@': paths.src,
            },
        }, 
        optimization: isDev ? undefined : minify,
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? devServer : undefined,
    };
}

module.exports = (env) => {
    const paths = {
        entry: path.resolve(__dirname, 'src', 'main.ts'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };

    const mode = env.mode || 'development';
    const PORT = env.port || 3000;
    const isDev = mode === 'development';


    const config = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
    })

    return config;
};