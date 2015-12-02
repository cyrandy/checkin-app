var webpack = require('webpack')

module.exports = {
  resolve: {
    modulesDirectories: ['shared', 'node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude:[/node_modules/], loader: 'babel?presets[]=react,presets[]=es2015' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /\.sass$/, loader: 'style!css?sourceMap!sass?sourceMap&indentedSyntax&outputStyle=expanded' }
    ]
  },
}
