const path = require('path')
const compression = require('compression')
const dotenv = require('dotenv')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const TerserPlugin = require('terser-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const WorkerPlugin = require('worker-plugin')
const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const sourcePath = path.join(__dirname, './src')
const outputhPath = path.resolve(__dirname, './dist')

dotenv.config()

console.log({
    views: path.join(sourcePath, '/view'),
    services: path.join(sourcePath, '/services'),
    hooks: path.join(sourcePath, '/hooks')
})

const webpackConfig = env => {
    return {
        context: sourcePath,
        mode: process.env.NODE_ENV,
        devtool: 'source-map',
        entry: {
            main: './index.tsx'
        },
        output: {
            path: outputhPath,
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name]-[chunkhash].js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
            alias: {
                views: path.join(sourcePath, '/views'),
                services: path.join(sourcePath, '/services'),
                hooks: path.join(sourcePath, '/hooks'),
                utils: path.join(sourcePath, '/utils'),
                infra: path.join(sourcePath, '/infra'),
                pages: path.join(sourcePath, '/pages')
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            // Loads a SASS/SCSS file and include the partial files before compilation
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    data:
                                        '@import "breakpoints.scss"; \n' +
                                        '@import "shadows.scss";',
                                    includePaths: [`${sourcePath}/styles`]
                                },
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    test: /\.js(\?.*)?$/i
                })
            ],
            runtimeChunk: true,
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    reactVendors: {
                        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                        name: 'react~vendors'
                    }
                }
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'assets/index.html',
                favicon: 'assets/favicon.png',
                inlineSource: 'runtime~.+\\.js'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[chunkhash].css',
                chunkFilename: '[name].[chunkhash].css'
            }),
            new WorkboxWebpackPlugin.GenerateSW({
                clientsClaim: true,
                runtimeCaching: [
                    {
                        urlPattern: /^https?.*/,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'ReactdexCacheV1',
                            expiration: {
                                maxEntries: 200
                            }
                        }
                    }
                ]
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false
            }),
            new WebpackPwaManifest({
                name: 'React DEX',
                short_name: 'React DEX',
                description: 'An unoficial pokedex web app',
                background_color: '#fff',
                theme_color: '#fff',
                display: 'standalone',
                start_url: '.',
                orientation: 'portrait',
                icons: [
                    {
                        src: path.resolve('src/assets/icon.png'),
                        sizes: [192, 256, 512],
                        ios: true
                    }
                ],
                ios: {
                    'apple-mobile-web-app-title': 'React DEX',
                    'apple-mobile-web-app-capable': true,
                    'apple-mobile-web-app-status-bar-style': 'black'
                }
            }),
            new Dotenv({
                path: path.join(__dirname, './.env'),
                systemvars: true
            })
        ],
        node: {
            module: 'empty',
            dgram: 'empty',
            dns: 'mock',
            fs: 'empty',
            http2: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty'
        },
        devServer: {
            compress: true,
            port: process.env.PORT,
            before(app) {
                app.use(compression())
            }
        }
    }
}

module.exports = webpackConfig
