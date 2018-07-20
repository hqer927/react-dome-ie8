const webpack = require('webpack');
const es3ifyPlugin = require('es3ify-webpack-plugin');
/*const ExtractTextPlugin = require('extract-text-webpack-plugin');*/
module.exports = {
    entry: {
        vendors: ['console-polyfill','es6-promise','babel-polyfill','jquery','fetch-ie8','react','react-dom','md5','react-bootstrap','reflux','react-mixin','prop-types'],
        app:[`${__dirname}/app.js`]
    },
    output: {
        path: `${__dirname}/dist/`,
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: 'dist/'
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
                        'transform-es3-property-literals',
                        'transform-es3-member-expression-literals',
                        'transform-es2015-modules-simple-commonjs'
                    ],
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less/,loaders: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=10240&publicPath=../images&outputPath=../images/&name=../images/[name].[ext]'
            }
            /*            {
             test: /\.less/,
             loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
             },*/
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:['vendors','manifest']
        }),
        new es3ifyPlugin()
/*        new webpack.DefinePlugin({
         'process.env':{
         'NODE_ENV': JSON.stringify('production')
         }
         }),*/
/*        new ExtractTextPlugin('../css/[name].css'),*/
/*      new webpack.optimize.UglifyJsPlugin({
         compress: {
         warnings: false
         }
      })*/
    ]
};
