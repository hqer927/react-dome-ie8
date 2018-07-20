const webpack = require('webpack');
const es3ifyPlugin = require('es3ify-webpack-plugin');
module.exports = {
    entry: {
        vendors: ['console-polyfill','es6-promise','es5-shim','es5-shim/es5-sham','babel-polyfill','jquery','react','react-dom','prop-types','react-bootstrap'],
        componentUI:[
            `${__dirname}/componentUI/js/DropDown.js`,
            `${__dirname}/componentUI/js/ItemInputList.js`,
            `${__dirname}/componentUI/js/SearchInput.js`,
            `${__dirname}/componentUI/js/SearchBtnInput.js`,
            `${__dirname}/componentUI/js/SearchBtnInput1.js`,
            `${__dirname}/componentUI/js/Input.js`
        ],
        bindUI:[`${__dirname}/js/bindUI.js`]
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
                test: /\.less/,loaders: ['style-loader','css-loader','autoprefixer-loader','less-loader']
            },
            {test: /\.(png|jpg)$/,loader: 'url-loader?limit=1024&name=images/[name].[ext]'},
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:['componentUI','vendors','manifest']
        }),
        new es3ifyPlugin()/* ,
      new webpack.optimize.UglifyJsPlugin({
         compress: {
         warnings: false
         }
      })*/
    ]
};
