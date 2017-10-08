const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

function nodeExternals() {
		return fs.readdirSync('node_modules')
			.concat(['react-dom/server'])
			.filter((mod) => mod !== '.bin')
			.reduce((externals, mod) => {
				externals[mod] = `commonjs ${mod}`;
				return externals;
			}, {});

	}
module.exports = [{		
		name: 'client',
		entry: './app/views/index-client.js',
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'public')
        },
        module: {
			rules: [{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: {
                            loader: 'css-loader',
                            // only for dev
							options: {
								sourceMap: true,
								modules: true
							}
						}
					})
				},
				{
					test: /\.svg$/,
					loader: 'svg-sprite-loader'
				},
				{
					test: /\.(ttf|eot|otf|png)$/,
					loader: 'file-loader?emitFile=false'
				}
			]
		},
		plugins: [
			new ExtractTextPlugin({
				filename: 'style.css',
				allChunks: true
			}),
			new OptimizeCssAssetsPlugin({
				cssProcessorOptions: {
					discardComments: {
						removeAll: true
					}
				}
			}),
			new UglifyJSPlugin()
		],
		watch: true
	},
	{	
        name: 'server',
        target: "node",
        externals: [nodeExternals()],
		entry: {
			app: [
				'regenerator-runtime/runtime',
				'./app/views/index-server.src.js'
			]
		},
		output: {
			filename: 'index-server.js',
			path: path.resolve(__dirname, 'app', 'views'),
			libraryTarget: 'commonjs2',
			publicPath: '/public/'
        },
        module: {
			rules: [{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.css$/,
					loader: 'ignore-loader'
				}
			]
		}
	}
];
