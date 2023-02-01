const path = require('path')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const WebpackBar = require('webpackbar')

function getStyleLoaders(...loaders) {
    return [
        'style-loader',
        {
            loader: 'css-loader',
            //获取localIdentName
            options: {
                modules: {
                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                },
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
        path: undefined,
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].chunk.js',
        assetModuleFilename: 'static/js/[hash:10][ext][query]',
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
                    plugins: [
                        // 开启js的HMR
                        'react-refresh/babel',
                    ],
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
        // 开启js的HMR
        new ReactRefreshWebpackPlugin(),
        // 打包进度条
        new WebpackBar({
            color: '#0bbdba', // 默认green，进度条颜色支持HEX
            basic: false, // 默认true，启用一个简单的日志报告器
            profile: false, // 默认false，启用探查器。
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
    },
    // webpack解析模块加载选项
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            SRC: path.resolve(__dirname, '../src'),
            COMMON: path.resolve(__dirname, '../src/common'),
        },
    },
    devServer: {
        host: 'localhost',
        port: 8888,
        open: true, //自动打开浏览器
        hot: true, //热模块替换
        historyApiFallback: true, // 解决路由刷新404
    },
    mode: 'development',
    devtool: 'cheap-module-source-map',
}
