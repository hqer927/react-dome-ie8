const webpack = require('webpack');
const es3ifyPlugin = require('es3ify-webpack-plugin');
module.exports = {
    entry: {
        navigationBar:['console-polyfill','es6-promise','babel-polyfill','jquery','react','react-dom','prop-types',`${__dirname}/src/js/app.js`]
    },
    output: {
        path: `${__dirname}/build/`,
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: 'build/'
    },
    devServer: {
        contentBase:__dirname,
        inline: true,
        port: 8888,
        host:'0.0.0.0'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: ['babel-loader'],
                query: {
                    plugins:[
                        'transform-runtime',
                        ['transform-es2015-classes',{'loose':true}],
                        'transform-proto-to-assign',
                        'transform-decorators-legacy',
                        'transform-decorators'
                    ],
                    presets: ['es2015', 'react','stage-1']
                }
            },
            {
                test: /\.less/,loaders: ['style-loader','css-loader','autoprefixer-loader','less-loader']
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?publicPath=../images&outputPath=../images/&name=../images/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new es3ifyPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
