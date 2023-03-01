import path from "path";
import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import {VueLoaderPlugin} from 'vue-loader';
import Dotenv from 'dotenv-webpack';

type BuildMode = 'production' | 'development';
type DefaultConfigurationValue  = "...";

interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
}

interface BuildEnv {
    mode: BuildMode;
    port: number;
}

interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
}

function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {
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
}

function buildWebpackConfig(options: BuildOptions) {
    const { paths, mode, isDev } = options;

    const devServer: DevServerConfiguration = {
        static: './build',
        open: true,
        hot: true,
    };

    const plugins: webpack.WebpackPluginInstance[] = [
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
        optimization: isDev ? undefined : {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(),
                "..." as DefaultConfigurationValue,
            ],
        },
        devtool: isDev ? 'inline-source-map' : 'eval',
        devServer: isDev ? devServer : undefined,
    };
}

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'main.ts'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };

    const mode = env.mode || 'development';
    const PORT = env.port || 3000;
    const isDev = mode === 'development';


    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
    })

    return config;
};