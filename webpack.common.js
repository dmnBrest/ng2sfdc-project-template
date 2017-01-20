var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var fs = require('fs');

var appPath = path.join(__dirname, 'src');
var modulesPath = path.join(__dirname, 'node_modules');
var tsConfigPath =path.join(__dirname, 'tsconfig.json');

var config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
console.log(config);

var entryFromConfig = {
    'vendor': path.join(__dirname, 'src', 'vendor.ts'),
    // 'testx': path.join(__dirname, 'src', 'apps', 'testx', 'testx.ts'),
    // 'testz': './src/apps/testz/testz.ts',
    // 'heroes': './src/apps/heroes/heroes.ts',
    'globals': ['zone.js', 'reflect-metadata'],
}

for (var app of config.project.apps) {
  entryFromConfig[app.name] = path.join(__dirname, 'src', 'apps', app.name, app.name+'.ts')
}

module.exports = {

  entry: entryFromConfig,

  resolve: {
    root: [appPath],
    modulesDirectories: [modulesPath],
    extensions: ['', '.ts', '.js']
  },

  resolveLoader: {
    root: modulesPath
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
            'awesome-typescript-loader?configFileName='+tsConfigPath,
            'angular2-template-loader'
        ]
      },
      {
          test: /\.html$/,
          loader: 'raw-loader'
      },
      {
          test: /\.css$/,
          loader: 'raw-loader'
      }

    //   {
    //     test: /\.html$/,
    //     loader: 'html'
    //   },
    //   {
    //     test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
    //     loader: 'file?name=assets/[name].[hash].[ext]'
    //   },
    //   {
    //     test: /\.css$/,
    //     exclude: helpers.root('src', 'app'),
    //     loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
    //   },
    //   {
    //     test: /\.css$/,
    //     include: helpers.root('src', 'app'),
    //     loader: 'raw'
    //   }
    ]
  },

  plugins: [

    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: true }
    // }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'globals']
    }),

    // new HtmlWebpackPlugin({
    //   template: 'src/index.html'
    // })
  ]
};