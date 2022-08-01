const path = require('path')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function getStyleLoaders(...loaders) {
    return [
        // 提取css为单独文件
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            //获取localIdentName
            options: {
                modules: true,
            },
        },
        {
            // 处理css兼容性问题
            // 需要在package.json中配置browserlist来指定兼容到那些版本
            loader: 'postcss-loader',
            // 此处要用官网最新写法，配置一个postcss.config.js,并且browserlist的配置也写在里面
            // options: {
            //     postcssOption: {
            //         plugin: ['postcss-preset-env'],
            //     },
            // },
        },
        ...loaders,
    ].filter(Boolean)
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        // 为了更好的缓存加上contenthash
        filename: 'static/js/[name].[contenthash:10].js',
        chunkFilename: 'static/js/[name].[contenthash:10].chunk.js',
        assetModuleFilename: 'static/js/[hash:10][ext][query]',
        // 清除上次打包内容
        clean: true,
    },
    module: {
        rules: [
            // css
            {
                test: /\.css$/,
                use: getStyleLoaders(),
            },
            // sass、less和stylus都和css配置差不多，只是多了对应的loader
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders('sass-loader'),
            },
            // 图片
            {
                test: /\.(jpe?g|png|git|webp|svg)$/,
                type: 'asset',
                parser: {
                    // 小于10kb就将对于图片资源转换为base64
                    // 转换后文件会变大（原文件越大转换后增加的体积就更多），但是减少了请求
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            },
            // 其他资源
            {
                test: /\.(woff2|ttf)$/,
                // 'asset'可以转base64'asset/resource' 不能
                type: 'asset/resource',
            },
            // js--babel
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, '../src'),
                loader: 'babel-loader',
                options: {
                    // 开启缓存
                    cacheDirectory: true,
                    // 缓存不压缩
                    cacheCompression: false,
                },
            },
        ],
    },
    plugins: [
        // 处理js--配置eslint
        new ESLintWebpackPlugin({
            context: path.resolve(__dirname, '../src'),
            exclude: 'node_modules',
            cache: true,
            cacheLocation: path.resolve(
                __dirname,
                '../node_modules/.cache/.eslintcache'
            ),
        }),
        // 处理html
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
        }),
        // 提取css为单独文件
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:10].css',
            chunkFilename: 'static/css/[name].[contenthash:10].chunk.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'),
                    to: path.resolve(__dirname, '../dist'),
                    globOptions: {
                        ignore: ['**/index.html'],
                    },
                },
            ],
        }),
    ],

    optimization: {
        // 代码分割
        splitChunks: {
            chunks: 'all',
        },
        // 解决缓存失效
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`,
        },
        // 压缩css和js
        minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
    },
    // webpack解析模块加载选项
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            SRC: path.resolve(__dirname, '../src'),
            COMMON: path.resolve(__dirname, '../src/common'),
        },
    },
    mode: 'production',
    devtool: 'source-map',
}
